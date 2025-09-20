// const express = require("express");
// const { addMoney } = require("../controllers/paymentController");
// const router = express.Router();

// router.post("/add-money", addMoney);

// module.exports = router;


const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const paymentController = require("../controllers/paymentController");

router.post("/create-order", auth, paymentController.createOrder);
router.post("/verify-payment", auth, paymentController.verifyPayment);
router.get("/wallet", auth, paymentController.getWallet);

module.exports = router;
