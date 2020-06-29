const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4 } = require("uuid");

const AccountSchema = new Schema(
  {
    uuid: { type: String, default: v4 },
    accountName: { type: String, trim: true },
    accountNumber: { type: Number, unique: true },
    bvn: { type: String },
    accountOwner: { type: Object },
    phone: { type: String },
    type: { type: String, enum: ["current", "savings"] },
    beneficiary: { type: Array },
    balance: { type: Number, default: 0.0 },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    transactionHistory: { type: Array },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Account", AccountSchema);
