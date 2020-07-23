const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v1 } = require("uuid");

const expenseSchema = new Schema(
  {
    title: { type: String, trim: true },
    amount: { type: Number, min: 0, required: "Amount is required" },
    category: { type: String, trim: true },
    notes: { type: String, trim: true },
    recorded_by: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Expense", expenseSchema, "expense");
