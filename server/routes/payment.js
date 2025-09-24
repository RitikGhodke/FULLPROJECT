// const express = require("express");
// const { addMoney } = require("../controllers/paymentController");
// const router = express.Router();

// router.post("/add-money", addMoney);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", auth, paymentController.createOrder);
// router.post("/verify-payment", auth, paymentController.verifyPayment);
// router.get("/wallet", auth, paymentController.getWallet);

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { createOrder, fetchPayment } = require("../controllers/paymentController");

// // Routes
// router.post("/order", createOrder);
// router.get("/payment/:id", fetchPayment);

// module.exports = router;









// import express from "express";
// import { createOrder, paymentVerification } from "../controllers/paymentController.js";

// const router = express.Router();

// // Create order
// router.post("/order", createOrder);

// // Verify payment
// router.post("/verify", paymentVerification);

// export default router;







// const express = require("express");
// const router = express.Router();
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", paymentController.createOrder);
// router.post("/verify-payment", paymentController.verifyPayment);
// router.get("/wallet", paymentController.getWallet);

// module.exports = router;








// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth"); // JWT middleware
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", auth, paymentController.createOrder);
// router.post("/verify-payment", auth, paymentController.verifyPayment);
// router.get("/wallet", auth, paymentController.getWallet);

// module.exports = router;






//after deploy

// import express from "express";
// import Razorpay from "razorpay";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const router = express.Router();

// const rzp = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Auth middleware
// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// // Create order
// router.post("/create-order", auth, async (req, res) => {
//   const { productId } = req.body;
//   if (!productId) return res.status(400).json({ message: "Product ID required" });

//   // Product prices same as frontend
//   const products = {
//     1: 100, 2: 500, 3: 1200, 4: 2400, 5: 4980,
//     6: 9850, 7: 15600, 8: 22450, 9: 35000, 10: 55800
//   };

//   const amount = products[productId];
//   if (!amount) return res.status(400).json({ message: "Invalid product" });

//   try {
//     const order = await rzp.orders.create({
//       amount: amount * 100, // in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`
//     });

//     res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     res.status(500).json({ message: "Order creation failed", error: err.message });
//   }
// });

// // Verify payment
// router.post("/verify-payment", auth, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return res.status(400).json({ message: "Incomplete payment data" });
//   }

//   // For simplicity, not verifying signature here (add HMAC verification in production)
//   // Update user's wallet or purchase history
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.wallet = (user.wallet || 0) - 0; // optional: add payment logic
//     await user.save();

//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// });

// export default router;





// import express from "express";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";
// import { verifyToken } from "./authMiddleware.js";

// dotenv.config();
// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create order
// router.post("/create-order", verifyToken, async (req, res) => {
//   const { productId } = req.body;
//   const amount = productId * 100; // Example, change as per product
//   try {
//     const order = await razorpay.orders.create({
//       amount,
//       currency: "INR",
//       receipt: `receipt_order_${Date.now()}`
//     });
//     res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Order creation failed" });
//   }
// });

// // Verify payment
// router.post("/verify-payment", verifyToken, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   // TODO: add verification logic
//   res.json({ success: true });
// });

// export default router;






// import express from 'express';
// import Razorpay from 'razorpay';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// // Middleware
// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'No token' });
//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Razorpay instance
// const rzp = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Create order
// router.post('/create-order', authMiddleware, async (req, res) => {
//   const { productId } = req.body;
//   const amount = productId * 100; // example price mapping
//   try {
//     const order = await rzp.orders.create({
//       amount,
//       currency: 'INR',
//       receipt: `order_rcpt_${Date.now()}`
//     });
//     res.json({ order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Order creation failed' });
//   }
// });

// // Verify payment
// router.post('/verify-payment', authMiddleware, async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   // signature verification can be added here
//   res.json({ message: 'Payment verified' });
// });

// export default router;




// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import authMiddleware from "./authMiddleware.js"; // <-- make sure ye file exist karti ho
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// dotenv.config();

// const router = express.Router();

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Debugging - check env keys
// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   console.error("❌ Razorpay keys missing. Check .env file!");
// }

// // Example products
// const PRODUCTS = [
//   { id: 1, name: "AI Robot 1", amount: 100, validityDays: 2, totalProfit: 30, dailyProfit: 15 },
//   { id: 2, name: "AI Robot 2", amount: 500, validityDays: 5, totalProfit: 125, dailyProfit: 25 },
// ];

// // ✅ Create Razorpay Order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = PRODUCTS.find((p) => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = {
//       amount: product.amount * 100, // amount in paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return res.json({ order, product });
//   } catch (err) {
//     console.error("createOrder error:", err);
//     return res.status(500).json({ message: "Order creation failed" });
//   }
// });

// // ✅ Verify Razorpay Payment
// router.post("/verify-payment", authMiddleware, async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;

//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     const product = PRODUCTS.find((p) => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24 * 60 * 60 * 1000);

//     const purchase = await Purchase.create({
//       user: user._id,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       startDate,
//       expiryDate,
//       totalProfit: product.totalProfit,
//       dailyProfit: product.dailyProfit,
//       remainingDays: product.validityDays,
//       active: true,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//     });

//     return res.json({ success: true, purchase });
//   } catch (err) {
//     console.error("verifyPayment error:", err);
//     return res.status(500).json({ message: "Payment verification failed" });
//   }
// });

// export default router;








// import express from "express";
// import Razorpay from "razorpay";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// dotenv.config();

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Auth middleware
// const authMiddleware = async (req, res, next) => {
//   const auth = req.headers.authorization;
//   if (!auth) return res.status(401).json({ message: "Unauthorized" });
//   const token = auth.split(" ")[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(payload.id);
//     next();
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// // Create order
// router.post("/create-order", authMiddleware, async (req, res) => {
//   const { productId } = req.body;
//   const products = {
//     1: { name: "AI Robot 1", price: 100 },
//     2: { name: "AI Robot 2", price: 500 },
//   };
//   const product = products[productId];
//   if (!product) return res.status(400).json({ message: "Invalid product" });

//   const options = {
//     amount: product.price * 100, // in paise
//     currency: "INR",
//     receipt: `order_rcpt_${Date.now()}`,
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Order creation failed" });
//   }
// });

// export default router;





//final deploymenrt

import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create Razorpay Order
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Payment order creation failed", error });
  }
});

// ✅ Verify Razorpay Payment
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error });
  }
});

export default router;

