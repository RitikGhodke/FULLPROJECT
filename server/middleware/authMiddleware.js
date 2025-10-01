// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/User.js";

// dotenv.config();

// const authMiddleware = async (req, res, next) => {
//   try {
//     // Header se token lena
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     // Token verify karo
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // User nikalna
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(401).json({ message: "Invalid token - User not found" });
//     }

//     req.user = user; // request ke sath user attach kar diya
//     next();
//   } catch (error) {
//     console.error("Auth error:", error.message);
//     return res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// };

// export default authMiddleware;



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // middleware to verify JWT token
// export const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token provided" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("AuthMiddleware error:", err.message);
//     res.status(401).json({ message: "Unauthorized - Invalid token" });
//   }
// };





//final deploy

// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };

// export default authMiddleware;










//final deploy2

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Fetch complete user object from database
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    req.user = user; // ✅ Now req.user is complete user object
    next();
    
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;