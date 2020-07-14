const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1 } = require("uuid");

const transactionSchema = new Schema({
  uuid: { type: String, default: v1 },
  amount: { type: Number },
  status: {
    type: String,
    default: "successful",
    enum: ["successful", "failed", "pending", "reversed", "cancelled"],
  },
  type: { type: String, required: true },
  sender: { type: Object },
  receiver: { type: Object, required: true },
  accountNumber: { type: Number },
  oldBalance: { type: Number },
  newBalance: { type: Number },
});

module.exports = mongoose.model("Transaction", transactionSchema);
