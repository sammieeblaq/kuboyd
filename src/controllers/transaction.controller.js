const Transaction = require("../models/transaction.models");
const Account = require("../models/account.models");
const { formatDate } = require("../utils/time.utils");
const DB = require("../utils/db.utils");

module.exports = {
  creditAccount: async (req, res) => {
    const { userAccountNumber } = req.query;
    const { accNum } = req.body;
    const { creditAmount } = req.body;

    const accountToDebit = await DB.findByAccountNumber(
      Account,
      userAccountNumber
    );
    const accountToCredit = await DB.findByAccountNumber(Account, accNum);
    const { accountName, balance } = accountToCredit;
    const newBalance = parseFloat(balance) + parseFloat(creditAmount);

    const newTransaction = new Transaction({
      type: "Credit",
      accountNumber: accNum,
      receiver: receiver,
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

  transfer: async (req, res) => {},
};
