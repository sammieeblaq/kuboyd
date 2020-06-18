const Transaction = require("../models/transaction.models");
const Account = require("../models/account.models");
const DB = require("../utils/db.utils");
const transaction = require("../services/transaction.services");

module.exports = {
  creditAccount: async (req, res) => {
    // Crediting account can also be known as depositing into your account
    const { accNum } = req.query;
    const { creditAmount } = req.body;

    const accountToCredit = await DB.findByAccountNumber(Account, accNum);
    let { accountName, balance } = accountToCredit;
    const newBalance = parseInt(balance) + parseInt(creditAmount);
    try {
      const newTransaction = await Transaction.create({
        type: "deposit",
        accountNumber: accNum,
        receiver: accountToCredit.accountOwner,
        sender: accountName,
        amount: parseFloat(creditAmount),
        oldBalance: parseFloat(balance),
        newBalance: newBalance,
      });

      const updatedAccount = await DB.updateAccount(
        Account,
        accNum,
        creditAmount
      );
      const data = {
        id: newTransaction._id,
        accountNumber: accNum,
        amount: newTransaction.amount,
        receiver: newTransaction.receiver,
        transactionType: newTransaction.type,
        oldBalance: parseFloat(newTransaction.oldBalance),
        newBalance: parseFloat(newTransaction.newBalance),
        updatedAccount,
      };
      return res.json(data);
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  transferToAccount: async (req, res) => {
    const { accNum } = req.query;
    const { amount, recipient } = req.body;

    try {
      const [accountToDebit, accountToCredit] = await Promise.all([
        DB.findByAccountNumber(Account, accNum),
        DB.findByAccountNumber(Account, recipient),
      ]);
      const transfer = await transaction.transfer(
        accountToDebit,
        accountToCredit,
        amount
      );
      // console.log(transfer);
      res.json(transfer);
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },
};
