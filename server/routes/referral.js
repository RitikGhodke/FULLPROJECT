import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getReferralInfo, requestReferralWithdrawal } from "../controllers/referralController.js";

const router = express.Router();

router.get("/info", authMiddleware, getReferralInfo);
router.post("/withdraw", authMiddleware, requestReferralWithdrawal);

export default router;