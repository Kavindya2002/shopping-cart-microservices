const asyncHandler = require('../utils/asyncHandler');
const orderService = require('../services/orderService');

const listOrder = asyncHandler(async (req, res) => {
  const records = await orderService.getAll();

  res.status(200).json({
    count: records.length,
    data: records
  });
});

const getOrderById = asyncHandler(async (req, res) => {
  const record = await orderService.getById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(record);
});

const createOrder = asyncHandler(async (req, res) => {
  const record = await orderService.create(req.body);
  res.status(201).json(record);
});

const updateOrder = asyncHandler(async (req, res) => {
  const record = await orderService.updateById(req.params.id, req.body);

  if (!record) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(record);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const record = await orderService.deleteById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json({
    message: 'Order deleted successfully'
  });
});

module.exports = {
  listOrder,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};
