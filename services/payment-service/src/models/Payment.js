const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, trim: true },
    customerId: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ['card', 'cash-on-delivery', 'online-transfer'], required: true },
    currency: { type: String, default: 'LKR', trim: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    transactionReference: { type: String, required: true, unique: true, trim: true }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', PaymentSchema);
