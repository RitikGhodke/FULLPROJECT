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






// import express from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, phone, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, phone, password: hashed });
//   await user.save();
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token, user });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ message: "Invalid credentials" });
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) return res.status(401).json({ message: "Invalid credentials" });
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token, user });
// });

// // Get current user
// router.get("/me", async (req, res) => {
//   const auth = req.headers.authorization;
//   if (!auth) return res.status(401).json({ message: "Unauthorized" });
//   const token = auth.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(payload.id);
//     res.json(user);
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// export default router;







import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendOTPEmail, generateOTP } from "../utils/emailService.js";

const router = express.Router();

// ✅ Temporary OTP storage (in production, use Redis or Database)
const otpStore = new Map(); // { email: { otp, expiresAt, userData } }

// ✅ Step 1: Send OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email, name, phone, password } = req.body;

    console.log("🔹 OTP request for:", email);

    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP and user data temporarily
    otpStore.set(email, {
      otp,
      expiresAt,
      userData: { name, email, phone, password }
    });

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    console.log(`✅ OTP sent to ${email}: ${otp}`); // Remove in production

    res.json({ 
      success: true, 
      message: "OTP sent to your email",
      email: email 
    });

  } catch (error) {
    console.error("❌ Send OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Step 2: Verify OTP & Create Account
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("🔹 OTP verification for:", email);

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP required" });
    }

    // Get stored OTP data
    const storedData = otpStore.get(email);

    if (!storedData) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    // Check if OTP expired
    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired. Request a new one." });
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is correct - Create user account
    const { name, email: userEmail, phone, password } = storedData.userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: userEmail,
      phone,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    // Clear OTP from storage
    otpStore.delete(email);

    console.log("✅ User registered successfully:", email);

    res.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("❌ Verify OTP error:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});

// ✅ Resend OTP
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const storedData = otpStore.get(email);
    if (!storedData) {
      return res.status(400).json({ message: "No pending registration found" });
    }

    // Generate new OTP
    const newOTP = generateOTP();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    // Update OTP
    otpStore.set(email, {
      ...storedData,
      otp: newOTP,
      expiresAt
    });

    // Send new OTP
    await sendOTPEmail(email, newOTP);

    console.log(`✅ OTP resent to ${email}: ${newOTP}`);

    res.json({ success: true, message: "New OTP sent" });

  } catch (error) {
    console.error("❌ Resend OTP error:", error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
});

// ✅ Login (No OTP needed for existing users)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔹 Login attempt:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    console.log("✅ Login successful:", email);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;