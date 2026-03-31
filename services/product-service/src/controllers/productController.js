const asyncHandler = require('../utils/asyncHandler');
const productService = require('../services/productService');

const listProduct = asyncHandler(async (req, res) => {
  const records = await productService.getAll();

  res.status(200).json({
    count: records.length,
    data: records
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const record = await productService.getById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(record);
});

const createProduct = asyncHandler(async (req, res) => {
  const record = await productService.create(req.body);
  res.status(201).json(record);
});

const updateProduct = asyncHandler(async (req, res) => {
  const record = await productService.updateById(req.params.id, req.body);

  if (!record) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(record);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const record = await productService.deleteById(req.params.id);

  if (!record) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({
    message: 'Product deleted successfully'
  });
});

module.exports = {
  listProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
