const asyncHandler = require('../utils/asyncHandler');
const inventoryService = require('../services/inventoryService');

const listInventory = asyncHandler(async (req, res) => {
  const records = await inventoryService.getAll();

  res.status(200).json({
    count: records.length,
    data: records
  });
});

const getInventoryById = asyncHandler(async (req, res) => {
  const record = await inventoryService.getById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Inventory not found');
  }

  res.status(200).json(record);
});

const createInventory = asyncHandler(async (req, res) => {
  const record = await inventoryService.create(req.body);
  res.status(201).json(record);
});

const updateInventory = asyncHandler(async (req, res) => {
  const record = await inventoryService.updateById(req.params.id, req.body);

  if (!record) {
    res.status(404);
    throw new Error('Inventory not found');
  }

  res.status(200).json(record);
});

const deleteInventory = asyncHandler(async (req, res) => {
  const record = await inventoryService.deleteById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Inventory not found');
  }

  res.status(200).json({
    message: 'Inventory deleted successfully'
  });
});

module.exports = {
  listInventory,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory
};
