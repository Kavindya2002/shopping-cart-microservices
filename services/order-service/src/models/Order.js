const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true, trim: true },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }
      }
    ],
    shippingAddress: { type: String, required: true, trim: true },
    totalAmount: { type: Number, required: true, min: 0 },
    orderStatus: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentStatus: { type: String, enum: ['unpaid', 'paid', 'refunded'], default: 'unpaid' }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', OrderSchema);
