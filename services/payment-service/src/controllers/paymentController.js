const asyncHandler = require('../utils/asyncHandler');
const paymentService = require('../services/paymentService');

const listPayment = asyncHandler(async (req, res) => {
  const records = await paymentService.getAll();

  res.status(200).json({
    count: records.length,
    data: records
  });
});

const getPaymentById = asyncHandler(async (req, res) => {
  const record = await paymentService.getById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Payment not found');
  }

  res.status(200).json(record);
});

const createPayment = asyncHandler(async (req, res) => {
  const record = await paymentService.create(req.body);
  res.status(201).json(record);
});

const updatePayment = asyncHandler(async (req, res) => {
  const record = await paymentService.updateById(req.params.id, req.body);

  if (!record) {
    res.status(404);
    throw new Error('Payment not found');
  }

  res.status(200).json(record);
});

const deletePayment = asyncHandler(async (req, res) => {
  const record = await paymentService.deleteById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Payment not found');
  }

  res.status(200).json({
    message: 'Payment deleted successfully'
  });
});

module.exports = {
  listPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment
};
