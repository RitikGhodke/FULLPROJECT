// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const header = req.headers.authorization || "";
//   if (!header.startsWith("Bearer ")) return res.status(401).json({ message: "No token provided" });
//   const token = header.split(" ")[1];
//   try {
//     const data = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: data.id, email: data.email };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };









const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Login required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
