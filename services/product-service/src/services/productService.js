const Product = require('../models/Product');

const getAll = (filter = {}) => {
  return Product.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => {
  return Product.findById(id);
};

const create = (payload) => {
  return Product.create(payload);
};

const updateById = (id, payload) => {
  return Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
};

const deleteById = (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
