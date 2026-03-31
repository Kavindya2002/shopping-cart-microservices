const Inventory = require('../models/Inventory');

const createInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create inventory record',
      error: error.message
    });
  }
};

const getInventoryRecords = async (req, res) => {
  try {
    const inventoryRecords = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json(inventoryRecords);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch inventory records',
      error: error.message
    });
  }
};

const getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({
      message: 'Invalid inventory ID',
      error: error.message
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const updatedData = {
      ...req.body,
      lastUpdated: Date.now()
    };

    const inventory = await Inventory.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }

    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update inventory record',
      error: error.message
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory record not found' });
    }

    res.status(200).json({ message: 'Inventory record deleted successfully' });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete inventory record',
      error: error.message
    });
  }
};

module.exports = {
  createInventory,
  getInventoryRecords,
  getInventoryById,
  updateInventory,
  deleteInventory
};
