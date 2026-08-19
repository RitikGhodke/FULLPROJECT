// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// export const createOrder = async (req, res) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const { productId } = req.body;
//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const options = { amount: product.amount*100, currency:"INR", receipt:`order_rcpt_${Date.now()}` };
//     const order = await razorpay.orders.create(options);
//     res.json({ order, product });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Order creation failed" });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId } = req.body;
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) 
//       return res.status(400).json({ message:"Missing payment fields" });

//     const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest('hex');

//     if (generated_signature !== razorpay_signature) 
//       return res.status(400).json({ message:"Invalid signature" });

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message:"Invalid product" });

//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays*24*60*60*1000);

//     const purchase = await Purchase.create({
//       user: req.user._id,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       startDate,
//       expiryDate,
//       totalProfit: product.totalProfit,
//       dailyProfit: product.dailyProfit,
//       remainingDays: product.validityDays,
//       active: true,
//       status: "paid",
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id
//     });

//     res.json({ success:true, purchase });
//   } catch (err) {
//     res.status(500).json({ message:"Verification failed" });
//   }
// };

// export const getWallet = async (req,res) => {
//   try {
//     const user = await User.findById(req.user._id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt:-1 }).lean();
//     res.json({ walletBalance: user.walletBalance||0, purchases });
//   } catch(err) {
//     res.status(500).json({ message:"Failed to fetch wallet" });
//   }
// };









// import Purchase from "../models/Purchase.js";
// import User from "../models/User.js";
// import PaymentSettings from "../models/PaymentSettings.js";

// const PRODUCTS = [
//   { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
//   { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
//   { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
//   { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
//   { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
//   { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
//   { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
//   { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
//   { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
//   { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
// ];

// // ✅ Public/User: get QR + UPI id to show on payment page
// export const getPaymentSettings = async (req, res) => {
//   try {
//     let settings = await PaymentSettings.findOne();
//     if (!settings) settings = await PaymentSettings.create({});
//     res.json({ upiId: settings.upiId, qrImageUrl: settings.qrImageUrl });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch payment settings" });
//   }
// };

// // ✅ Admin: update QR image + UPI id
// export const updatePaymentSettings = async (req, res) => {
//   try {
//     const { upiId } = req.body;
//     let settings = await PaymentSettings.findOne();
//     if (!settings) settings = new PaymentSettings();

//     if (upiId !== undefined) settings.upiId = upiId;
//     if (req.file) settings.qrImageUrl = `/uploads/qr/${req.file.filename}`;

//     await settings.save();
//     res.json({ success: true, settings });
//   } catch (err) {
//     res.status(500).json({ message: err.message || "Failed to update payment settings" });
//   }
// };

// // ✅ User: submit UTR after paying via UPI/QR
// export const submitPayment = async (req, res) => {
//   try {
//     const { productId, utrNumber } = req.body;
//     if (!utrNumber || !utrNumber.trim()) {
//       return res.status(400).json({ message: "UTR / Transaction ID required" });
//     }

//     const product = PRODUCTS.find(p => p.id === Number(productId));
//     if (!product) return res.status(400).json({ message: "Invalid product" });

//     const purchase = await Purchase.create({
//       user: req.user._id,
//       productId: product.id,
//       productName: product.name,
//       amount: product.amount,
//       utrNumber: utrNumber.trim(),
//       totalProfit: product.totalProfit,
//       dailyProfit: product.dailyProfit,
//       remainingDays: product.validityDays,
//       status: "pending_verification",
//       active: false,
//     });

//     res.json({ success: true, message: "Payment submitted, admin verification ke baad active hoga", purchase });
//   } catch (err) {
//     res.status(500).json({ message: "Payment submission failed" });
//   }
// };

// // ✅ Admin: list all pending purchases
// export const getPendingPurchases = async (req, res) => {
//   try {
//     const pending = await Purchase.find({ status: "pending_verification" })
//       .populate("user", "name email")
//       .sort({ createdAt: -1 })
//       .lean();
//     res.json({ success: true, pending });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch pending purchases" });
//   }
// };

// // ✅ Admin: approve purchase -> starts validity now
// export const approvePurchase = async (req, res) => {
//   try {
//     const { purchaseId } = req.body;
//     const purchase = await Purchase.findById(purchaseId);
//     if (!purchase) return res.status(404).json({ message: "Purchase not found" });
//     if (purchase.status !== "pending_verification") {
//       return res.status(400).json({ message: "Already processed" });
//     }

//     const product = PRODUCTS.find(p => p.id === purchase.productId);
//     const startDate = new Date();
//     const expiryDate = new Date(startDate.getTime() + product.validityDays * 24 * 60 * 60 * 1000);

//     purchase.status = "paid";
//     purchase.active = true;
//     purchase.startDate = startDate;
//     purchase.expiryDate = expiryDate;
//     purchase.processedBy = req.user._id;
//     purchase.processedAt = new Date();
//     await purchase.save();

//     res.json({ success: true, message: "Purchase approved", purchase });
//   } catch (err) {
//     res.status(500).json({ message: "Approval failed" });
//   }
// };

// // ✅ Admin: reject purchase
// export const rejectPurchase = async (req, res) => {
//   try {
//     const { purchaseId } = req.body;
//     const purchase = await Purchase.findById(purchaseId);
//     if (!purchase) return res.status(404).json({ message: "Purchase not found" });
//     if (purchase.status !== "pending_verification") {
//       return res.status(400).json({ message: "Already processed" });
//     }

//     purchase.status = "rejected";
//     purchase.active = false;
//     purchase.processedBy = req.user._id;
//     purchase.processedAt = new Date();
//     await purchase.save();

//     res.json({ success: true, message: "Purchase rejected", purchase });
//   } catch (err) {
//     res.status(500).json({ message: "Rejection failed" });
//   }
// };

// export const getWallet = async (req,res) => {
//   try {
//     const user = await User.findById(req.user._id).lean();
//     const purchases = await Purchase.find({ user: user._id }).sort({ createdAt:-1 }).lean();
//     res.json({ walletBalance: user.walletBalance||0, purchases });
//   } catch(err) {
//     res.status(500).json({ message:"Failed to fetch wallet" });
//   }
// };










import Purchase from "../models/Purchase.js";
import User from "../models/User.js";
import PaymentSettings from "../models/PaymentSettings.js";
import { distributeReferralCommission } from "../utils/distributeCommission.js";

const PRODUCTS = [
  { id:1, name:"AI Robot 1", amount:100, validityDays:2, totalProfit:30, dailyProfit:15 },
  { id:2, name:"AI Robot 2", amount:500, validityDays:5, totalProfit:125, dailyProfit:25 },
  { id:3, name:"AI Robot 3", amount:1200, validityDays:15, totalProfit:450, dailyProfit:30 },
  { id:4, name:"AI Robot 4", amount:2400, validityDays:30, totalProfit:1350, dailyProfit:45 },
  { id:5, name:"AI Robot 5", amount:4980, validityDays:45, totalProfit:2220, dailyProfit:49.33 },
  { id:6, name:"AI Robot 6", amount:9850, validityDays:60, totalProfit:8150, dailyProfit:135.83 },
  { id:7, name:"AI Robot 7", amount:15600, validityDays:90, totalProfit:24900, dailyProfit:276.66 },
  { id:8, name:"AI Robot 8", amount:22450, validityDays:120, totalProfit:60960, dailyProfit:508 },
  { id:9, name:"AI Robot 9", amount:35000, validityDays:150, totalProfit:97500, dailyProfit:650 },
  { id:10, name:"AI Robot 10", amount:55800, validityDays:180, totalProfit:134200, dailyProfit:745.55 }
];

export const getPaymentSettings = async (req, res) => {
  try {
    let settings = await PaymentSettings.findOne();
    if (!settings) settings = await PaymentSettings.create({});
    res.json({ upiId: settings.upiId, qrImageUrl: settings.qrImageUrl });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payment settings" });
  }
};

export const updatePaymentSettings = async (req, res) => {
  try {
    const { upiId } = req.body;
    let settings = await PaymentSettings.findOne();
    if (!settings) settings = new PaymentSettings();

    if (upiId !== undefined) settings.upiId = upiId;
    if (req.file) settings.qrImageUrl = `/uploads/qr/${req.file.filename}`;

    await settings.save();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update payment settings" });
  }
};

// ✅ User: submit UTR after paying via UPI/QR
export const submitPayment = async (req, res) => {
  try {
    const { productId, utrNumber } = req.body;
    if (!utrNumber || !utrNumber.trim()) {
      return res.status(400).json({ message: "UTR / Transaction ID required" });
    }

    const product = PRODUCTS.find(p => p.id === Number(productId));
    if (!product) return res.status(400).json({ message: "Invalid product" });

    // ✅ purchase limit — same plan max 2 baar
    const existingCount = await Purchase.countDocuments({
      user: req.user._id,
      productId: product.id,
      status: { $in: ["pending_verification", "paid"] },
    });
    if (existingCount >= 2) {
      return res.status(400).json({ message: "Aap is plan ko maximum 2 baar hi purchase kar sakte hain" });
    }

    const purchase = await Purchase.create({
      user: req.user._id,
      productId: product.id,
      productName: product.name,
      amount: product.amount,
      utrNumber: utrNumber.trim(),
      totalProfit: product.totalProfit,
      dailyProfit: product.dailyProfit,
      remainingDays: product.validityDays,
      status: "pending_verification",
      active: false,
    });

    // ✅ referral commission turant, purchase ke sath hi (admin approval ka wait nahi)
   
    res.json({ success: true, message: "Payment submitted, admin verification ke baad active hoga", purchase });
  } catch (err) {
    res.status(500).json({ message: "Payment submission failed" });
  }
};

export const getPendingPurchases = async (req, res) => {
  try {
    const pending = await Purchase.find({ status: "pending_verification" })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, pending });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending purchases" });
  }
};

// ✅ Admin: approve purchase -> starts validity now (referral commission yahan NAHI hoti ab)
export const approvePurchase = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) return res.status(404).json({ message: "Purchase not found" });
    if (purchase.status !== "pending_verification") {
      return res.status(400).json({ message: "Already processed" });
    }

    const product = PRODUCTS.find(p => p.id === purchase.productId);
    const startDate = new Date();
    const expiryDate = new Date(startDate.getTime() + product.validityDays * 24 * 60 * 60 * 1000);

    purchase.status = "paid";
    purchase.active = true;
    purchase.startDate = startDate;
    purchase.expiryDate = expiryDate;
    purchase.processedBy = req.user._id;
    purchase.processedAt = new Date();
    await purchase.save();

    await distributeReferralCommission(purchase);

   
    res.json({ success: true, message: "Purchase approved", purchase });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

export const rejectPurchase = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) return res.status(404).json({ message: "Purchase not found" });
    if (purchase.status !== "pending_verification") {
      return res.status(400).json({ message: "Already processed" });
    }

    purchase.status = "rejected";
    purchase.active = false;
    purchase.processedBy = req.user._id;
    purchase.processedAt = new Date();
    await purchase.save();

    res.json({ success: true, message: "Purchase rejected", purchase });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
};

export const getWallet = async (req,res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    const purchases = await Purchase.find({ user: user._id }).sort({ createdAt:-1 }).lean();
    res.json({ walletBalance: user.walletBalance||0, purchases });
  } catch(err) {
    res.status(500).json({ message:"Failed to fetch wallet" });
  }
};