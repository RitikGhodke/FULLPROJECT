// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/auth");
// const paymentRoutes = require("./routes/payment");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// connectDB(process.env.MONGO_URI).then(() => {
//   app.use("/api/auth", authRoutes);
//   app.use("/api/payment", paymentRoutes);

//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });



// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./config/db");

// const authRoutes = require("./routes/auth");
// const profileRoutes = require("./routes/profile");
// const paymentRoutes = require("./routes/payment");
// const adminRoutes = require("./routes/admin");
// const distributeJob = require("./cron/distributeProfit");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // serve uploaded avatars
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const PORT = process.env.PORT || 5000;

// connectDB(process.env.MONGO_URI).then(() => {
//   app.use("/api/auth", authRoutes);
//   app.use("/api/profile", profileRoutes);
//   app.use("/api/payment", paymentRoutes);
//   app.use("/api/admin", adminRoutes);

//   // start cron job
//   distributeJob.start();

//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(err => {
//   console.error("DB connection failed:", err);
// });



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// const paymentRoutes = require("./routes/payment");
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log("✅ MongoDB connected");
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// })
// .catch((err) => {
//     console.log("MongoDB connection error:", err);
// });





// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import paymentRoutes from "./routes/payment.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/payment", paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const paymentRoutes = require("./routes/payment");
// const authMiddleware = require("./middleware/auth");

// dotenv.config();
// const app = express();
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch(err => console.error(err));

// // Routes
// app.use("/api/payment", authMiddleware, paymentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








// server.js

// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // routes import karo
// const paymentRoutes = require("./routes/payment");
// // example: app.use("/api/payment", paymentRoutes);

// app.use("/api/payment", paymentRoutes);

// // MongoDB connect
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("Error: MONGO_URI is not defined in environment variables.");
//   process.exit(1); // stop server if no URI
// }

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // PORT setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







// server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // CORS setup
// app.use(cors({
//   origin: "https://fullproject-two.vercel.app", // yaha tumhara frontend URL
//   credentials: true
// }));

// // Routes import
// const paymentRoutes = require("./routes/payment");
// const authRoutes = require("./routes/auth"); // agar auth route alag hai
// app.use("/api/payment", paymentRoutes);
// app.use("/api/auth", authRoutes); // agar auth endpoints backend me hain

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("Error: MONGO_URI is not defined in environment variables.");
//   process.exit(1);
// }

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// // PORT setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });











//after deploy

// server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// // CORS setup
// app.use(cors({
//   origin: "https://fullproject-two.vercel.app", // frontend URL
//   credentials: true
// }));

// // Routes
// const paymentRoutes = require("./routes/payment");
// const authRoutes = require("./routes/auth"); // agar alag auth routes hai
// app.use("/api/payment", paymentRoutes);
// app.use("/api/auth", authRoutes);

// // MongoDB connect
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("Error: MONGO_URI is not defined in environment variables.");
//   process.exit(1);
// }

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => {
//   console.error("MongoDB connection error:", err);
//   process.exit(1);
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));













const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const MONGO_URI = "your_mongo_connection_string";
const JWT_SECRET = "your_jwt_secret";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

app.use(cors({ origin: true, credentials: true }));

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  avatar: String,
  walletBalance: { type: Number, default: 0 },
});
const User = mongoose.model("User", UserSchema);

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ------------------ Auth Routes ------------------
// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = await User.create({ name, email, phone, password });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user });
  } catch (err) { res.status(400).json({ message: "User exists or invalid data" }); }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token, user });
});

// Get profile
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

// ------------------ Profile Routes ------------------
// Update profile
app.put("/api/profile/update", authMiddleware, async (req, res) => {
  const { name, phone } = req.body;
  req.user.name = name || req.user.name;
  req.user.phone = phone || req.user.phone;
  await req.user.save();
  res.json({ message: "Profile updated", user: req.user });
});

// Upload avatar
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, req.user._id + path.extname(file.originalname))
});
const upload = multer({ storage });
app.post("/api/profile/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  req.user.avatar = `/uploads/${req.file.filename}`;
  await req.user.save();
  res.json({ message: "Avatar uploaded", avatar: req.user.avatar });
});

// ------------------ Payment Routes ------------------
app.post("/api/payment/create-order", authMiddleware, async (req, res) => {
  // Dummy implementation
  res.json({ order: { id: "order_123", amount: 100, currency: "INR" } });
});
app.post("/api/payment/verify-payment", authMiddleware, async (req, res) => {
  res.json({ message: "Payment verified" });
});
app.get("/api/payment/wallet", authMiddleware, async (req, res) => {
  res.json({ walletBalance: req.user.walletBalance, purchases: [] });
});

app.listen(5000, () => console.log("Server running on port 5000"));
