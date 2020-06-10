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

    const updateAccountBalance = (newBalance) => {
      return DB.updateAccount(Account, accNum, req.body.newBalance);
    };
    updateAccountBalance();
    try {
      const newTransaction = await Transaction.create({
        type: "deposit",
        accountNumber: accNum,
        receiver: accountToCredit.accountOwner,
        sender: accountName,
        amount: parseFloat(creditAmount),
        oldBalance: balance,
        newBalance: newBalance,
      });
      res.json(newTransaction);
    } catch (error) {
      throw new Error("not saved");
    }
  },
};
