const Customer = require('../models/Customer');

const getAll = (filter = {}) => {
  return Customer.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => {
  return Customer.findById(id);
};

const create = (payload) => {
  return Customer.create(payload);
};

const updateById = (id, payload) => {
  return Customer.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
};

const deleteById = (id) => {
  return Customer.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
