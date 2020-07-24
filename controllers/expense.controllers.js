const Account = require("../models/account.models");
const Expense = require("../models/expense.models");
const DB = require("../utils/db.utils");

module.exports = {
  create: async (req, res) => {
    const { phone } = req.decoded;
    const { title, amount, category, notes } = req.body;

    try {
      const { accountName } = await DB.findAccountByPhone(Account, phone);
      const expense = await Expense.create({
        title: title,
        amount: amount,
        category: category,
        notes: notes,
        recorded_by: accountName,
      });
      res.json({
        status: 200,
        expense: expense,
        message: "Expense Created Successfully",
      });
    } catch (error) {
      res.json({
        status: 400,
        message: "Expense Creation unsuccessful",
      });
    }
  },
};
