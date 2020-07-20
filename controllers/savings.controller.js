const Savings = require("../models/saving.models");
const Account = require("../models/account.models");
const transaction = require("../services/transaction.services");
const DB = require("../utils/db.utils");

module.exports = {
  save: async (req, res) => {
    const { phone } = req.decoded;
    // const { amount, phone } = req.body;

    const { accountNumber, balance } = await DB.findAccountByPhone(
      Account,
      phone
    );
    // console.log(balance);
    try {
      if (balance >= 0 && balance <= 50) {
        res.json({
          status: 400,
          message: "Insufficient Balance",
        });
      } else {
        const savings = await transaction.savings(accountNumber, amount);
        const newSaving = await Savings.create({
          amount: amount,
          balance: savings[0].balance,
          subAccount: savings[1].subAccount,
        });
        await DB.addSavingHistory(Account, accountNumber, newSaving);
        res.json(newSaving);
      }
    } catch (error) {
      if (error)
        res.status(500).json({
          message: "Saving Failed. Try again later or contact support",
        });
    }
  },
};
