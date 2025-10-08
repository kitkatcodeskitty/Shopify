import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

export const checkFile = (req, res, next) => {
  const file = req.files?.image;
  if (!file) return res.status(400).json({ message: 'image is required' });
  const extName = path.extname(file.name);
  if (!supportedExtensions.includes(extName)) return res.status(400).json({ message: 'invalid file type' });

  const imagePath = `${uuidv4()}-${file.name}`;

  file.mv(`./uploads/${imagePath}`, (err) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    req.imagePath = imagePath;
    next();
  });


}


export const checkImageFile = (req, res, next) => {
  const file = req.files?.image;
  if (!file) return res.status(400).json({ message: 'image is required' });
  const extName = path.extname(file.name);
  if (!supportedExtensions.includes(extName)) return res.status(400).json({ message: 'invalid file type' });

  const imagePath = `${uuidv4()}-${file.name}`;

  file.mv(`./user_images/${imagePath}`, (err) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    req.imagePath = imagePath;
    next();
  });


}


export const updateImageFile = (req, res, next) => {
  const file = req.files?.image;
  if (!file) return next();
  const extName = path.extname(file.name);
  if (!supportedExtensions.includes(extName)) return res.status(400).json({ message: 'invalid file type' });

  const imagePath = `${uuidv4()}-${file.name}`;

  file.mv(`./user_images/${imagePath}`, (err) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    req.imagePath = imagePath;
    next();
  });


}


export const updateCheckFile = (req, res, next) => {
  const file = req.files?.image;

  if (!file) return next();
  const extName = path.extname(file.name);
  if (!supportedExtensions.includes(extName)) return res.status(400).json({ message: 'invalid file type' });

  const imagePath = `${uuidv4()}-${file.name}`;

  file.mv(`./uploads/${imagePath}`, (err) => {
    if (err) return res.status(500).json({ message: 'something went wrong' });
    req.imagePath = imagePath;
    next();
  });


}