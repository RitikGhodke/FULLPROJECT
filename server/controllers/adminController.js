// const Purchase = require("./models/Purchase");
const Purchase = require("../models/purchase");

const User = require("../models/User");

// manual run distribution (for testing)
exports.runDistributionNow = async (req, res) => {
  try {
    const activePurchases = await Purchase.find({ active: true });
    for (const p of activePurchases) {
      if (p.remainingDays <= 0) {
        p.active = false;
        await p.save();
        continue;
      }
      await User.findByIdAndUpdate(p.user, { $inc: { walletBalance: p.dailyProfit } });
      p.remainingDays = p.remainingDays - 1;
      if (p.remainingDays <= 0) p.active = false;
      await p.save();
    }
    return res.json({ success: true, message: "Distribution executed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
