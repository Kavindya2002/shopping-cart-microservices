const Cart = require('../models/Cart');

const getAll = (filter = {}) => {
  return Cart.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => {
  return Cart.findById(id);
};

const create = (payload) => {
  return Cart.create(payload);
};

const updateById = (id, payload) => {
  return Cart.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
};

const deleteById = (id) => {
  return Cart.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
