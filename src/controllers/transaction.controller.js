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
        amount: creditAmount,
        oldBalance: balance,
        newBalance: newBalance,
      });

      const updatedAccount = await DB.incrementAccount(
        Account,
        accNum,
        creditAmount
      );

      if (updatedAccount) {
        const data = {
          id: newTransaction._id,
          accountNumber: accNum,
          amount: newTransaction.amount,
          receiver: newTransaction.receiver,
          transactionType: newTransaction.type,
          oldBalance: parseFloat(newTransaction.oldBalance),
          newBalance: parseFloat(newTransaction.newBalance),
          // updatedBalance: updatedAccount.balance,
        };
        await DB.updateTransactionStatus(
          Transaction,
          newTransaction._id,
          "successful"
        );
        return res.json({
          message: "Transaction Successful, Thank you for using Kuboyd",
          data: data,
        });
      } else {
        return res.json({
          message: "Transaction Failed, Try again later or contact Support",
          status: 500,
        });
      }
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  debitAccount: async (req, res) => {
    const { accNum } = req.query;
    const { debitAmount } = req.body;

    const accountToDebit = await DB.findByAccountNumber(Account, accNum);
    let { accountName, balance } = accountToDebit;
    const newBalance = parseInt(balance) - parseInt(debitAmount);
    try {
      const newTransaction = await Transaction.create({
        type: "withdrawal",
        accountNumber: accNum,
        receiver: accountToCredit.accountOwner,
        sender: accountName,
        amount: debitAmount,
        oldBalance: balance,
        newBalance: newBalance,
      });

      const updatedAccount = await DB.decrementAccount(
        Account,
        accNum,
        debitAmount
      );

      if (updatedAccount) {
        const data = {
          id: newTransaction._id,
          accountNumber: accNum,
          amount: newTransaction.amount,
          receiver: newTransaction.receiver,
          transactionType: newTransaction.type,
          oldBalance: parseFloat(newTransaction.oldBalance),
          newBalance: parseFloat(newTransaction.newBalance),
          // updatedBalance: updatedAccount.balance,
        };
        return res.json({
          message: "Transaction Successful, Thank you for using Kuboyd",
          data: data,
        });
      } else {
        return res.json({
          message: "Transaction Failed, Try again later or contact Support",
          status: 500,
        });
      }
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
      await DB.addBeneficiary(Account, accNum, recipient);
      const newTransaction = await Transaction.create({
        type: "transfer",
        accNumber: accNum,
        sender: transfer.from,
        receiver: transfer.to,
        amount: amount,
      });
      res.json(newTransaction);
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  getTransactions: async (req, res) => {
    try {
      const transactions = await DB.find(Transaction);
      res.json(transactions);
    } catch (error) {
      console.error("Cannot get the transactions.. Kindly contact support");
    }
  },

  getTransactionById: async (req, res) => {
    const { id } = req.query;
    try {
      const transaction = await DB.findById(Transaction, id);
      res.json(transaction);
    } catch (error) {
      if (error)
        res.status(500).json({
          message:
            "Cannot get Id of the given transaction.. Kindly contact support.",
        });
    }
  },

  removeTransaction: async (req, res) => {
    const { id } = req.query;
    try {
      const transaction = await DB.deleteOne(Transaction, id);
      res.json({
        message: "Transaction deleted from Account",
        deleted: transaction,
      });
    } catch (error) {
      console.error(
        "Unable to delete account.. Try again later or contact support"
      );
    }
  },
};
