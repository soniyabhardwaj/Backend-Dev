const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  balance: { type: Number, default: 0 },
  accountType: String
});

module.exports = mongoose.model("Account", accountSchema);