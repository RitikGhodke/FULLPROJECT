// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN }
//   );
// };

// exports.register = async (req, res) => {
//   try {
//     const { name, email, phone, password, inviteCode } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Email and password required" });

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const hash = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, phone, password: hash, inviteCode });
//     const token = generateToken(user);

//     res.status(201).json({
//       token,
//       user: { id: user._id, email: user.email, name: user.name, phone: user.phone, inviteCode: user.inviteCode, walletBalance: user.walletBalance },
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user);
//     res.json({ token, user: { id: user._id, email: user.email, name: user.name, phone: user.phone, inviteCode: user.inviteCode, walletBalance: user.walletBalance } });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };



const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email & password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hash });

    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar, walletBalance: user.walletBalance } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
