const Cart = require('../models/Cart');

const createCart = async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create cart',
      error: error.message
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().sort({ createdAt: -1 });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch carts',
      error: error.message
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid cart ID',
      error: error.message
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update cart',
      error: error.message
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete cart',
      error: error.message
    });
  }
};

module.exports = {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  deleteCart
};
