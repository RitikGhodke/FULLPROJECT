const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const { updateProfile, uploadAvatar } = require("../controllers/profileController");

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads", "avatars")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

router.put("/update", auth, updateProfile);
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);

module.exports = router;
