const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1 } = require("uuid");

const TransactionSchema = new Schema({
  uuid: { type: String, default: v1 },
  amount: { type: Number },
  status: {
    type: String,
    enum: ["successful", "failed", "pending", "reversed", "cancelled"],
  },
  type: { type: String, required: true },
  sender: { type: Object },
  receiver: { type: Object, required: true },
  accountNumber: { type: Number },
  oldBalance: { type: Number },
  newBalance: { type: Number },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
