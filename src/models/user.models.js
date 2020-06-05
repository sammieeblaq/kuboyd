const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: { type: Number, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("User", UserSchema);
