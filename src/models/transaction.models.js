const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  amount: { type: Number, default: 0 },
  type: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  receiver: { type: String, required: true },
  oldBalance: { type: Number },
  newBalance: { type: Number },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
