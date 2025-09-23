// const User = require("../models/User");
// const path = require("path");

// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     const user = await User.findByIdAndUpdate(req.user.id, { name, phone }, { new: true }).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.uploadAvatar = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });
//     const avatarPath = `/uploads/avatars/${req.file.filename}`;
//     const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarPath }, { new: true }).select("-password");
//     res.json({ avatar: avatarPath, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };










//final devployment

// const User = require("../models/User");
// const path = require("path");

// // Update user profile (name & phone)
// exports.updateProfile = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     const { name, phone } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, phone },
//       { new: true }
//     ).select("-password");

//     res.json(user);
//   } catch (err) {
//     console.error("updateProfile error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Upload user avatar
// exports.uploadAvatar = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Login required" });
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const avatarPath = `/uploads/avatars/${req.file.filename}`;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatar: avatarPath },
//       { new: true }
//     ).select("-password");

//     res.json(c{ avatar: avatarPath, user });
//   } catch (err) {
//     console.error("uploadAvatar error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };






import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, phone }, { new:true }).select("-password");
    res.json(user);
  } catch(err) { res.status(500).json({ message: err.message }); }
};

export const uploadAvatar = async (req, res) => {
  try {
    if(!req.file) return res.status(400).json({ message:"No file uploaded" });
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarPath }, { new:true }).select("-password");
    res.json({ avatar: avatarPath, user });
  } catch(err){ res.status(500).json({ message: err.message }); }
};
