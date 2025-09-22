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

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// CORS setup
app.use(cors({
  origin: "https://fullproject-two.vercel.app", // yaha tumhara frontend URL
  credentials: true
}));

// Routes import
const paymentRoutes = require("./routes/payment");
const authRoutes = require("./routes/auth"); // agar auth route alag hai
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes); // agar auth endpoints backend me hain

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("Error: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// PORT setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
