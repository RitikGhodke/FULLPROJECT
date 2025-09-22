// const express = require("express");
// const { addMoney } = require("../controllers/paymentController");
// const router = express.Router();

// router.post("/add-money", addMoney);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", auth, paymentController.createOrder);
// router.post("/verify-payment", auth, paymentController.verifyPayment);
// router.get("/wallet", auth, paymentController.getWallet);

// module.exports = router;




// const express = require("express");
// const router = express.Router();
// const { createOrder, fetchPayment } = require("../controllers/paymentController");

// // Routes
// router.post("/order", createOrder);
// router.get("/payment/:id", fetchPayment);

// module.exports = router;









// import express from "express";
// import { createOrder, paymentVerification } from "../controllers/paymentController.js";

// const router = express.Router();

// // Create order
// router.post("/order", createOrder);

// // Verify payment
// router.post("/verify", paymentVerification);

// export default router;







// const express = require("express");
// const router = express.Router();
// const paymentController = require("../controllers/paymentController");

// router.post("/create-order", paymentController.createOrder);
// router.post("/verify-payment", paymentController.verifyPayment);
// router.get("/wallet", paymentController.getWallet);

// module.exports = router;








const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // JWT middleware
const paymentController = require("../controllers/paymentController");

router.post("/create-order", auth, paymentController.createOrder);
router.post("/verify-payment", auth, paymentController.verifyPayment);
router.get("/wallet", auth, paymentController.getWallet);

module.exports = router;
