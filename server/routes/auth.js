// const express = require("express");
// const { register, login } = require("../controllers/authController");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

module.exports = router;
