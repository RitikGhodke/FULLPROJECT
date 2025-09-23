const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminController = require("../controllers/adminController");

router.post("/run-distribution", auth, adminController.runDistributionNow);

module.exports = router;



