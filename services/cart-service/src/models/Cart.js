const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true, trim: true },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
        size: { type: String, default: 'M' },
        color: { type: String, default: 'Black' }
      }
    ],
    totalAmount: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ['active', 'checked-out'], default: 'active' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Cart', CartSchema);
