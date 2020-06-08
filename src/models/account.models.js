const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4 } = require("uuid");

const AccountSchema = new Schema(
  {
    uuid: { type: String, default: v4 },
    accountName: { type: String, trim: true },
    accountNumber: { type: Number, unique: true },
    type: { type: String },
    balance: { type: Number, default: 0.0 },
    status: { type: String, default: "active" },
    // transactions: { type: Array },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Account", AccountSchema);
