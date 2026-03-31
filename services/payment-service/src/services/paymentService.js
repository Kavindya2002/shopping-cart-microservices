const Payment = require('../models/Payment');

const getAll = (filter = {}) => {
  return Payment.find(filter).sort({ createdAt: -1 });
};

const getById = (id) => {
  return Payment.findById(id);
};

const create = (payload) => {
  return Payment.create(payload);
};

const updateById = (id, payload) => {
  return Payment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });
};

const deleteById = (id) => {
  return Payment.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
