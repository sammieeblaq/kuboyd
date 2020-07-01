const Savings = require("../models/saving.models");
const Account = require("../models/account.models");
const transaction = require("../services/transaction.services");
const DB = require("../utils/db.utils");

module.exports = {
  save: async (req, res) => {
    const { phone } = req.decoded;
    const { amount } = req.body;

    const { accountNumber } = await DB.findAccountByPhone(Account, phone);
    try {
      const savings = await transaction.savings(accountNumber, amount);
      //   console.log(savings);
      const newSaving = await Savings.create({
        amount: amount,
        balance: savings[0].balance,
        subAccount: savings[1].subAccount,
      });
      //   console.log(saving);
      await DB.addSavingHistory(Account, accountNumber, newSaving);
      res.json(newSaving);
    } catch (error) {
      throw error;
    }
  },
};
