const Order = require('../models/Order');

const getAll = (filter = {}) => {
  return Order.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => {
  return Order.findById(id);
};

const create = (payload) => {
  return Order.create(payload);
};

const updateById = (id, payload) => {
  return Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
};

const deleteById = (id) => {
  return Order.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
