const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);