const cron = require("node-cron");
const Purchase = require("../models/purchase");
const User = require("../models/User");

const job = cron.schedule('0 0 * * *', async () => {
  console.log("Running daily profit distribution:", new Date().toISOString());
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
    console.log("Distribution complete");
  } catch (err) {
    console.error("Distribution error:", err);
  }
}, { scheduled: false });

module.exports = job;



