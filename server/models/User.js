// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   phone: String,
//   password: { type: String, required: true },
//   inviteCode: String,
//   walletBalance: { type: Number, default: 0 }   // 💰 New field
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);



// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String },
//   password: { type: String, required: true },
//   avatar: { type: String, default: "" },
//   walletBalance: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);






// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   walletBalance: { type: Number, default: 0 }
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);





//after deploy5
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String },
//   password: { type: String, required: true },
//   wallet: { type: Number, default: 0 }
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);




// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   password: String,
//   avatar: String
// });

// export default mongoose.model("User", userSchema);






// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   phone: String
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);






// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       default: "",
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;







// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   phone: String,
//   password: String
// });

// export default mongoose.model("User", userSchema);










//final deploy

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phone: { type: String },
//   password: { type: String, required: true },
//   walletBalance: { type: Number, default: 0 }, // user ka wallet
//   avatar: { type: String, default: "" },       // profile picture
// }, { timestamps: true }); // createdAt, updatedAt

// export default mongoose.model("User", userSchema);





//with

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   phone: { type: String },
//   password: { type: String, required: true },
//   walletBalance: { type: Number, default: 0 },
//   avatar: { type: String, default: "" },
  
//   // ✅ Bank Details
//   bankAccountNumber: { type: String, default: "" },
//   ifscCode: { type: String, default: "" },
//   accountHolderName: { type: String, default: "" },
//   bankName: { type: String, default: "" },
  
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);






import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  password: { type: String, required: true },
  walletBalance: { type: Number, default: 0 },
  avatar: { type: String, default: "" },

  bankAccountNumber: { type: String, default: "" },
  ifscCode: { type: String, default: "" },
  accountHolderName: { type: String, default: "" },
  bankName: { type: String, default: "" },

  // ✅ Referral System
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  referralBalance: { type: Number, default: 0 },

}, { timestamps: true });

userSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode = crypto.randomBytes(4).toString("hex").toUpperCase();
  }
  next();
});

export default mongoose.model("User", userSchema);