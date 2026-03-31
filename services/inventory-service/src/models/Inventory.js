const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    stockQuantity: { type: Number, required: true, min: 0 },
    reservedQuantity: { type: Number, default: 0, min: 0 },
    reorderLevel: { type: Number, default: 10, min: 0 },
    warehouseLocation: { type: String, required: true, trim: true },
    status: { type: String, enum: ['in-stock', 'low-stock', 'out-of-stock'], default: 'in-stock' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Inventory', InventorySchema);
