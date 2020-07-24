const router = require("express").Router();
const expense = require("../controllers/expense.controllers");

router
  .route("/expense")
  .post(expense.create)
  .get(expense.getExpenses)
  .get(expense.getExpense);

module.exports = router;
