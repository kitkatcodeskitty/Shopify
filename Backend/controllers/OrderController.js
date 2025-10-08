import Order from "../models/Order.js";
import mongoose from "mongoose";


export const getOrders = async (req, res) => {
  const role = req.role;
  const userId = req.userId;
  try {
    if (role === 'Admin') {
      const orders = await Order.find({});
      return res.status(200).json(orders);
    } else {
      const orders = await Order.find({ user: userId });
      return res.status(200).json(orders);
    }

  } catch (err) {
    return res.status(400).json({ message: err.message }); 0

  }
}


export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'invalid order id' });
    const isExist = await Order.findById(id).populate({
      path: 'user',
      model: 'User',
      select: 'email username'
    });
    if (!isExist) return res.status(404).json({ message: 'order not found' });
    return res.status(200).json(isExist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}


export const createOrder = async (req, res) => {
  const { totalAmount, products } = req.body;
  try {
    await Order.create({
      totalAmount,
      user: req.userId,
      products
    });
    return res.status(201).json({ message: 'Order successfully created' });
  } catch (err) {
    return res.status(400).json({ message: err.message });

  }

}