import mongoose from "mongoose";

const referralEarningSchema = new mongoose.Schema({
  earner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  purchase: { type: mongoose.Schema.Types.ObjectId, ref: "Purchase", required: true },
  level: { type: Number, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("ReferralEarning", referralEarningSchema);