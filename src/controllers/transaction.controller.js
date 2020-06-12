const Transaction = require("../models/transaction.models");
const Account = require("../models/account.models");
const { formatDate } = require("../utils/time.utils");
const DB = require("../utils/db.utils");

module.exports = {
  creditAccount: async (req, res) => {
    // Crediting account can also be known as depositing into your account
    const { accNum } = req.query;
    const { creditAmount } = req.body;

    const accountToCredit = await DB.findByAccountNumber(Account, accNum);
    let { accountName, balance } = accountToCredit;
    const newBalance = parseFloat(balance) + parseFloat(creditAmount);
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
        newBalance
      );
      const data = {
        id: newTransaction._id,
        accountNumber: accNum,
        amount: newTransaction.amount,
        receiver: newTransaction.receiver,
        transactionType: newTransaction.type,
        oldBalance: newTransaction.oldBalance,
        newBalance: newTransaction.newBalance,
        updatedAccount,
      };
      return res.json(data);
    } catch (error) {
      throw new Error("not saved");
    }
  },

  transferToAccount: async (req, res) => {
    const { accNum } = req.query;
    const { amount, recipientAcc } = req.body;

    const [accountToCredit, accountToDebit] = await Promise.all([
      DB.findByAccountNumber(Account, accNum),
      DB.findByAccountNumber(Account, recipientAcc),
    ]);
    // const newBalance = parseFloat(balance) + parseFloat(creditAmount);
    const transfer = (accountToCredit, accountToDebit, amount) => {};
  },
};
