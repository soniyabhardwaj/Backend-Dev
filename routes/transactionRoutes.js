const express = require("express");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/deposit", async (req, res) => {
  const acc = await Account.findById(req.body.accountId);
  acc.balance += req.body.amount;
  await acc.save();
  res.send(acc);
});

router.post("/withdraw", async (req, res) => {
  const acc = await Account.findById(req.body.accountId);
  if (acc.balance < req.body.amount) return res.send("Insufficient balance");

  acc.balance -= req.body.amount;
  await acc.save();
  res.send(acc);
});

router.post("/transfer", async (req, res) => {
  const { from, to, amount } = req.body;

  const fromAcc = await Account.findById(from);
  const toAcc = await Account.findById(to);

  if (fromAcc.balance < amount) return res.send("Insufficient balance");

  fromAcc.balance -= amount;
  toAcc.balance += amount;

  await fromAcc.save();
  await toAcc.save();

  await Transaction.create({
    fromAccount: from,
    toAccount: to,
    amount
  });

  res.send("Transfer Successful");
});

module.exports = router;