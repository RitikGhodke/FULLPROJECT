const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";
  if (!header.startsWith("Bearer ")) return res.status(401).json({ message: "No token provided" });
  const token = header.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: data.id, email: data.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
