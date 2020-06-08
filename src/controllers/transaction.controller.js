const Transaction = require("../models/transaction.models");
const Account = require("../models/account.models");
const { formatDate } = require("../utils/time.utils");
const DB = require("../utils/db.utils");

module.exports = {
  creditAccount: async (req, res) => {
    const { accNum } = req.query;
    const { creditAmount, sender } = req.body;

    const accountToCredit = await DB.findByAccountNumber(Account, accNum);
    const { accountName, balance, status } = accountToCredit;
    const newBalance = parseFloat(balance) + parseFloat(creditAmount);
    const newTransaction = new Transaction({
      type: "Credit",
      accountNumber: accNum,
      receiver: accountName,
      sender: sender,
      amount: parseFloat(creditAmount),
      oldBalance: balance,
      newBalance: newBalance,
    });
    try {
      const result = await newTransaction.save();
      res.json(result);
    } catch (error) {
      throw new Error("not saved");
    }
  },

  debitAccount: async (req, res) => {
    const { accNum } = req.query;
  },
};
