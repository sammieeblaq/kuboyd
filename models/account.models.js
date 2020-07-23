const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4 } = require("uuid");

const accountSchema = new Schema(
  {
    uuid: { type: String, default: v4 },
    accountName: { type: String, trim: true },
    accountNumber: { type: Number, unique: true },
    bvn: { type: String },
    accountOwner: { type: Object },
    phone: { type: String },
    type: { type: String, enum: ["current", "savings"] },
    beneficiary: { type: Array },
    transactionHistory: { type: Array },
    savingsHistory: { type: Array },
    balance: { type: Number, default: 0, min: 0 },
    subAccount: { type: Number, default: 0, min: 0 },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Account", accountSchema);
