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






import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
