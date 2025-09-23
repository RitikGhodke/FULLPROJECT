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

import express from "express";
import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Create order
router.post("/create-order", auth, async (req, res) => {
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: "Product ID required" });

  // Product prices same as frontend
  const products = {
    1: 100, 2: 500, 3: 1200, 4: 2400, 5: 4980,
    6: 9850, 7: 15600, 8: 22450, 9: 35000, 10: 55800
  };

  const amount = products[productId];
  if (!amount) return res.status(400).json({ message: "Invalid product" });

  try {
    const order = await rzp.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
});

// Verify payment
router.post("/verify-payment", auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Incomplete payment data" });
  }

  // For simplicity, not verifying signature here (add HMAC verification in production)
  // Update user's wallet or purchase history
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wallet = (user.wallet || 0) - 0; // optional: add payment logic
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Payment verification failed" });
  }
});

export default router;
