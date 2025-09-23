// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   productId: Number,
//   productName: String,
//   amount: Number,
//   startDate: { type: Date, default: Date.now },
//   expiryDate: Date,
//   totalProfit: Number,
//   dailyProfit: Number,
//   remainingDays: Number,
//   active: { type: Boolean, default: true },
//   razorpayOrderId: String,
//   razorpayPaymentId: String
// }, { timestamps: true });

// module.exports = mongoose.model("Purchase", purchaseSchema);







// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   productId: Number,
//   productName: String,
//   amount: Number,
//   startDate: Date,
//   expiryDate: Date,
//   totalProfit: Number,
//   dailyProfit: Number,
//   remainingDays: Number,
//   active: Boolean,
//   razorpayOrderId: String,
//   razorpayPaymentId: String
// }, { timestamps: true });

// module.exports = mongoose.model("Purchase", purchaseSchema);




// const mongoose = require("mongoose");

// const purchaseSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   amount: { type: Number, required: true },
//   paymentId: { type: String },  // Razorpay payment ID
//   orderId: { type: String },    // Razorpay order ID
//   status: { type: String, default: "pending" }, // pending / success / failed
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Purchase", purchaseSchema);






import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);
export default Purchase;

