const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1 } = require("uuid");

const TransactionSchema = new Schema({
  uuid: { type: String, default: v1 },
  amount: { type: Number, default: 0 },
  type: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "Account" },
  receiver: { type: String, required: true },
  oldBalance: { type: Number },
  newBalance: { type: Number },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
