import User from "../models/User.js";
import ReferralEarning from "../models/ReferralEarning.js";

const RATES = [0.05, 0.03, 0.02];

export const distributeReferralCommission = async (purchase) => {
  try {
    const buyer = await User.findById(purchase.user);
    let refUser = buyer?.referredBy ? await User.findById(buyer.referredBy) : null;

    for (let level = 0; level < RATES.length && refUser; level++) {
      const commissionAmount = Number((purchase.amount * RATES[level]).toFixed(2));

      refUser.referralBalance = (refUser.referralBalance || 0) + commissionAmount;
      await refUser.save();

      await ReferralEarning.create({
        earner: refUser._id,
        fromUser: purchase.user,
        purchase: purchase._id,
        level: level + 1,
        amount: commissionAmount,
      });

      refUser = refUser.referredBy ? await User.findById(refUser.referredBy) : null;
    }
  } catch (err) {
    console.error("Referral commission distribution failed:", err.message);
  }
};