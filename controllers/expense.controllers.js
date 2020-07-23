const Expense = require("../models/expense.models");
const DB = require("../utils/db.utils");

module.exports = {
  create: async (req, res) => {
    // const { phone } = req.decoded;
    try {
      const expense = await Expense.create(req.body);
      res.json({
        status: 200,
        expense: expense,
        message: "Expense Created Successfully",
      });
    } catch (error) {
      res.json({
        status: 400,
        message: "Expense Creation unsuccessful",
        error: error,
      });
    }
  },
};
