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



require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/admin");
const distributeJob = require("./cron/distributeProfit");

const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded avatars
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/payment", paymentRoutes);
  app.use("/api/admin", adminRoutes);

  // start cron job
  distributeJob.start();

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("DB connection failed:", err);
});
