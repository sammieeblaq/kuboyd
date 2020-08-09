const Transaction = require("../models/transaction.models");
const Account = require("../models/account.models");
const DB = require("../utils/db.utils");
const transaction = require("../services/transaction.services");

module.exports = {
  creditAccount: async (req, res) => {
    // Crediting account can also be known as depositing into your account
    const { accNum, creditAmount } = req.body;

    const validNumber = await DB.findByAccountNumber(Account, accNum);
    if (validNumber) {
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
          const newStatus = await DB.updateTransactionStatus(
            Transaction,
            newTransaction._id,
            "successful"
          );
          const data = {
            id: newTransaction._id,
            accountNumber: accNum,
            status: newStatus.status,
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
        }
      } catch (error) {
        if (error)
          res.status(500).json({
            message: "Transaction Failed, Try again later or contact Support",
            status: 500,
          });
      }
    } else {
      res.status(400).json({
        message: "Invalid account Number",
      });
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
          oldBalance: newTransaction.oldBalance,
          newBalance: newTransaction.newBalance,
        };
        return res.json({
          message: "Transaction Successful, Thank you for using Kuboyd",
          data: data,
        });
      }
    } catch (error) {
      if (error)
        res.status(500).json({
          message: "Transaction Failed, Try again later or contact Support",
          status: 500,
        });
    }
  },

  transferToAccount: async (req, res) => {
    const { phone } = req.decoded;
    const { amount, recipient } = req.body;

    if (!amount && !recipient) return;

    const { accountNumber } = await DB.findAccountByPhone(Account, phone);
    try {
      const [accountToDebit, accountToCredit] = await Promise.all([
        DB.findByAccountNumber(Account, accountNumber),
        DB.findByAccountNumber(Account, recipient),
      ]);
      if (accountToDebit.balance >= 0 && accountToDebit.balance <= 100) {
        res.json({
          status: 400,
          message: "Insufficient Balance",
        });
      } else {
        const transfer = await transaction.transfer(
          accountToDebit,
          accountToCredit,
          amount
        );
        if (accountToDebit.beneficiary.includes(recipient)) {
          !DB.addBeneficiary(Account, accountNumber, recipient);
        } else {
          DB.addBeneficiary(Account, accountNumber, recipient);
        }
        const newTransaction = await Transaction.create({
          type: "transfer",
          accNumber: accountNumber,
          sender: transfer.from,
          receiver: transfer.to,
          amount: amount,
        });
        await DB.addTransactionHistory(
          Account,
          accountNumber,
          newTransaction.receiver
        );
        res.json(newTransaction);
      }
    } catch (error) {
      res.json({
        status: 500,
        message: "Unable to complete the transaction... Please contact support",
      });
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
