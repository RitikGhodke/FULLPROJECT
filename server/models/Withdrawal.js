import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userEmail: String,
    amount: { type: Number, required: true },
    bankAccountNumber: String,
    ifscCode: String,
    accountHolderName: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    processedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    processedAt: Date,
  },
  { timestamps: true }
);

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);
export default Withdrawal;