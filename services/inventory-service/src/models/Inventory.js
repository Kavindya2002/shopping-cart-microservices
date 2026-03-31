const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      trim: true
    },
    availableStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    warehouseLocation: {
      type: String,
      required: true,
      trim: true
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Inventory', inventorySchema);
