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



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  walletBalance: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
