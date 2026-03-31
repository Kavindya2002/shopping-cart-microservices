const asyncHandler = require('../utils/asyncHandler');
const customerService = require('../services/customerService');

const listCustomer = asyncHandler(async (req, res) => {
  const records = await customerService.getAll();

  res.status(200).json({
    count: records.length,
    data: records
  });
});

const getCustomerById = asyncHandler(async (req, res) => {
  const record = await customerService.getById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.status(200).json(record);
});

const createCustomer = asyncHandler(async (req, res) => {
  const record = await customerService.create(req.body);
  res.status(201).json(record);
});

const updateCustomer = asyncHandler(async (req, res) => {
  const record = await customerService.updateById(req.params.id, req.body);

  if (!record) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.status(200).json(record);
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const record = await customerService.deleteById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.status(200).json({
    message: 'Customer deleted successfully'
  });
});

module.exports = {
  listCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
