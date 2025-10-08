import mongoose from "mongoose";

export const categories = ['electronics', 'fashion', 'jewelery', 'books'];
export const brands = ['apple', 'samsung', 'sony', 'dolce', 'gucci', 'nike', 'amazon', 'other'];

const productShema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: categories,
    required: true
  },
  brand: {
    type: String,
    enum: brands,
    required: true
  }



}, { timestamps: true });


const Product = mongoose.model('Product', productShema);

export default Product;