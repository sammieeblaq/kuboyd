const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccountSchema = new Schema(
  {
    accountNumber: { type: BigInt },
    type: { type: String, required: true },
    balance: { type: Number, default: 0 },
    status: { type: String },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Account", AccountSchema);
