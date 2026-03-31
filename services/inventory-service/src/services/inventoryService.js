const Inventory = require('../models/Inventory');

const getAll = (filter = {}) => {
  return Inventory.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => {
  return Inventory.findById(id);
};

const create = (payload) => {
  return Inventory.create(payload);
};

const updateById = (id, payload) => {
  return Inventory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
};

const deleteById = (id) => {
  return Inventory.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
