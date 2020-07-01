const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1 } = require("uuid");

const savingSchema = new Schema({
  uuid: { type: String, default: v1 },
  amount: { type: Number },
  status: {
    type: String,
    enum: ["successful", "failed", "pending", "reversed", "cancelled"],
  },
  balance: Number,
  subAccount: Number,
});

module.exports = mongoose.model("Savings", savingSchema);
