// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { register, login, me } = require("../controllers/authController");
// const auth = require("../middleware/auth");

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", auth, me);

// module.exports = router;





//after deploy5

// 






// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, phone, password: hashed });
//   await user.save();
//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, user });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: "User not found" });
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, user });
// });

// // Get current user
// router.get("/me", async (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   const decoded = jwt.verify(token, "secret");
//   const user = await User.findById(decoded.id);
//   res.json(user);
// });

// export default router;







// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import User from '../models/User.js';

// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   const { name, email, password, phone } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashedPassword, phone });
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//   res.json({ user, token });
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: 'Invalid email/password' });

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(401).json({ message: 'Invalid email/password' });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//   res.json({ user, token });
// });

// // Get current user
// router.get('/me', async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'No token' });
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     res.json(user);
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// export default router;






import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, phone, password: hashed });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// Get current user
router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Unauthorized" });
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    res.json(user);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;





