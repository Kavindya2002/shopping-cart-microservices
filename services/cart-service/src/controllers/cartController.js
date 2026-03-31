const asyncHandler = require('../utils/asyncHandler');
const cartService = require('../services/cartService');

const listCart = asyncHandler(async (req, res) => {
  const records = await cartService.getAll();

  res.status(200).json({
    count: records.length,
    data: records
  });
});

const getCartById = asyncHandler(async (req, res) => {
  const record = await cartService.getById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.status(200).json(record);
});

const createCart = asyncHandler(async (req, res) => {
  const record = await cartService.create(req.body);
  res.status(201).json(record);
});

const updateCart = asyncHandler(async (req, res) => {
  const record = await cartService.updateById(req.params.id, req.body);

  if (!record) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.status(200).json(record);
});

const deleteCart = asyncHandler(async (req, res) => {
  const record = await cartService.deleteById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Cart not found');
  }

  res.status(200).json({
    message: 'Cart deleted successfully'
  });
});

module.exports = {
  listCart,
  getCartById,
  createCart,
  updateCart,
  deleteCart
};
