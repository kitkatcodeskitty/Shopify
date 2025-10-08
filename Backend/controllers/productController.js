import Product, { brands, categories } from "../models/Product.js";
import fs from 'fs';
import mongoose from "mongoose";



export const getProducts = async (req, res) => {
  // console.log(req.cookies?.jwt);
  try {
    const queryObject = { ...req.query };

    const excludeFields = ['page', 'sort', 'limit', 'fields', 'skip', 'search'];
    excludeFields.forEach((field) => {
      delete queryObject[field];
    });

    if (req.query.search) {
      const searchText = req.query.search;

      if (categories.some((category) => category === searchText.toLowerCase())) {
        queryObject.category = { $regex: searchText, $options: 'i' };
      } else if (brands.some((brand) => brand === searchText.toLowerCase())) {
        queryObject.brand = { $regex: searchText, $options: 'i' };
      } else {
        queryObject.title = { $regex: searchText, $options: 'i' };
      }


    }
    const output = {};
    for (let key in queryObject) {
      const match = key.match(/(\w+)\[(\w+)\]/); // e.g. rating[gt]
      if (match) {
        const field = match[1];   // rating
        const operator = match[2]; // gt
        output[field] = { [`$${operator}`]: Number(queryObject[key]) };
      } else {
        // if no operator, keep it as is
        output[key] = isNaN(queryObject[key]) ? queryObject[key] : Number(queryObject[key]);
      }
    }





    let query = Product.find(output);


    if (req.query.sort) {
      const sortBy = req.query.sort.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.sort(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(/[\s,]+/).filter(Boolean).join(' ');
      query = query.select(fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const products = await query.skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(output);

    return res.status(200).json({
      totalPages: Math.ceil(totalProducts / limit),
      products,
      page
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'invalid product id' });
    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });
    return res.status(200).json(isExist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const addProduct = async (req, res) => {
  try {
    await Product.create({
      ...req.body,
      image: req.imagePath
    });
    return res.status(201).json({ message: 'Product successfully created' });
  } catch (err) {
    fs.unlink(`./uploads/${req.imagePath}`, (imageErr) => {
      return res.status(400).json({ message: err.message });
    })

  }
}




export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'invalid product id' });
    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    isExist.title = req.body?.title || isExist.title;
    isExist.description = req.body?.description || isExist.description;
    isExist.price = req.body?.price || isExist.price;
    isExist.stock = req.body?.stock || isExist.stock;
    isExist.category = req.body?.category || isExist.category;
    if (req.imagePath) {
      fs.unlink(`./uploads/${isExist.image}`, async (imageErr) => {
        isExist.image = req.imagePath;
        await isExist.save();
        return res.status(200).json({ message: 'Product successfully updated' });
      });
    } else {
      await isExist.save();
      return res.status(200).json({ message: 'Product successfully updated' });
    }


  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'invalid product id' });
    const isExist = await Product.findById(id);
    if (!isExist) return res.status(404).json({ message: 'product not found' });

    fs.unlink(`./uploads/${isExist.image}`, async (imageErr) => {
      await isExist.deleteOne();

      return res.status(200).json({ message: 'Product successfully deleted' });
    });



  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

