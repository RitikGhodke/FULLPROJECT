const User = require("../models/User");
const path = require("path");

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, phone }, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatarPath }, { new: true }).select("-password");
    res.json({ avatar: avatarPath, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
