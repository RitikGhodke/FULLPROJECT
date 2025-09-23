// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   try {
//     const decoded = jwt.verify(token, "secret");
//     req.user = decoded;
//     next();
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };





import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    // Header se token lena
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User nikalna
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid token - User not found" });
    }

    req.user = user; // request ke sath user attach kar diya
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

export default authMiddleware;
