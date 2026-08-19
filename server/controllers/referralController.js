import User from "../models/User.js";
import ReferralEarning from "../models/ReferralEarning.js";
import Withdrawal from "../models/Withdrawal.js";

export const getReferralInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).lean();
    const earnings = await ReferralEarning.find({ earner: user._id })
      .populate("fromUser", "name email")
      .sort({ createdAt: -1 })
      .lean();
    const directReferrals = await User.find({ referredBy: user._id })
      .select("name email createdAt")
      .lean();

    res.json({
      referralCode: user.referralCode,
      referralBalance: user.referralBalance || 0,
      totalReferrals: directReferrals.length,
      directReferrals,
      earnings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const requestReferralWithdrawal = async (req, res) => {
  try {
    const { amount } = req.body;
    const amt = Number(amount);
    if (!amt || amt <= 0) return res.status(400).json({ message: "Valid amount daalo" });

    const user = await User.findById(req.user._id);
    if (amt > (user.referralBalance || 0)) {
      return res.status(400).json({ message: "Insufficient referral balance" });
    }
    if (!user.bankAccountNumber || !user.ifscCode) {
      return res.status(400).json({ message: "Pehle profile me bank details add karo" });
    }

    user.referralBalance -= amt;
    await user.save();

    const withdrawal = await Withdrawal.create({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      amount: amt,
      bankAccountNumber: user.bankAccountNumber,
      ifscCode: user.ifscCode,
      accountHolderName: user.accountHolderName,
      type: "referral",
      status: "pending",
    });

    res.json({ success: true, message: "Withdrawal request admin ko bhej di gayi", withdrawal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};