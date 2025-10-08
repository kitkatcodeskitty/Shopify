import User from "../models/User.js";
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getUser = async (req, res) => {
  const userId = req.userId;
  try {
    const isExist = await User.findById(userId).select('-password -role');
    if (!isExist) return res.status(404).json({ message: 'user not found' });
    return res.status(200).json(isExist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const updateUser = async (req, res) => {
  const userId = req.userId;
  try {
    const isExist = await User.findById(userId);
    isExist.email = req.body?.email || isExist.email;
    isExist.username = req.body?.username || isExist.username;
    if (req.imagePath) {
      fs.unlink(`./user_images/${isExist.image}`, async (imageErr) => {
        isExist.image = req.imagePath;
        await isExist.save();
        return res.status(200).json({ message: 'User successfully updated' });
      });
    } else {
      await isExist.save();
      return res.status(200).json({ message: 'User successfully updated' });
    }

  } catch (err) {
    if (req.imagePath) {
      fs.unlink(`./user_images/${req.imagePath}`, (imageErr) => {
        return res.status(400).json({ message: err.message });
      })
    } else {
      return res.status(400).json({ message: err.message });
    }

  }
}



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email: email });
    if (!isExist) return res.status(404).json({ message: 'user not found' });

    const comparePass = bcrypt.compareSync(password, isExist.password);

    if (!comparePass) return res.status(400).json({ message: 'invalid credentials' });

    const token = jwt.sign({
      id: isExist._id,
      role: isExist.role,
    }, process.env.JWT_SECRET);
    
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none',
      secure: true
    });

    return res.status(200).json({
      token,
      role: isExist.role,
    });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}




export const registerUser = async (req, res) => {

  const { username, email, password } = req.body;
  try {


    const hashPass = bcrypt.hashSync(password, 10);
    await User.create({
      username,
      email,
      password: hashPass,
      image: req.imagePath
    });
    return res.status(201).json({ message: 'user successfully created' });

  } catch (err) {
    fs.unlink(`./user_images/${req.imagePath}`, (imageErr) => {
      return res.status(400).json({ message: err.message });
    })

  }

}