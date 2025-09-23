// const cron = require("node-cron");
// const Purchase = require("./models/purchase");
// const User = require("../models/User");

// const job = cron.schedule('0 0 * * *', async () => {
//   console.log("Running daily profit distribution:", new Date().toISOString());
//   try {
//     const activePurchases = await Purchase.find({ active: true });
//     for (const p of activePurchases) {
//       if (p.remainingDays <= 0) {
//         p.active = false;
//         await p.save();
//         continue;
//       }
//       await User.findByIdAndUpdate(p.user, { $inc: { walletBalance: p.dailyProfit } });
//       p.remainingDays = p.remainingDays - 1;
//       if (p.remainingDays <= 0) p.active = false;
//       await p.save();
//     }
//     console.log("Distribution complete");
//   } catch (err) {
//     console.error("Distribution error:", err);
//   }
// }, { scheduled: false });

// module.exports = job;






//final deploy

const cron = require("node-cron");
const Purchase = require("./models/Purchase");
const User = require("../models/User");

// Run every day at midnight
const job = cron.schedule('0 0 * * *', async () => {
  console.log("Running daily profit distribution:", new Date().toISOString());

  try {
    const activePurchases = await Purchase.find({ active: true });

    for (const purchase of activePurchases) {
      if (purchase.remainingDays <= 0) {
        purchase.active = false;
        await purchase.save();
        continue;
      }

      // Credit daily profit to user's wallet
      await User.findByIdAndUpdate(
        purchase.user,
        { $inc: { walletBalance: purchase.dailyProfit } }
      );

      // Decrement remaining days
      purchase.remainingDays -= 1;
      if (purchase.remainingDays <= 0) purchase.active = false;
      await purchase.save();
    }

    console.log("Daily distribution complete");
  } catch (err) {
    console.error("Error during profit distribution:", err);
  }
}, { scheduled: false });

module.exports = job;
