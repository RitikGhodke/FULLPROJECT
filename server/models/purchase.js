const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: Number,
  productName: String,
  amount: Number,
  startDate: { type: Date, default: Date.now },
  expiryDate: Date,
  totalProfit: Number,
  dailyProfit: Number,
  remainingDays: Number,
  active: { type: Boolean, default: true },
  razorpayOrderId: String,
  razorpayPaymentId: String
}, { timestamps: true });

module.exports = mongoose.model("Purchase", purchaseSchema);
