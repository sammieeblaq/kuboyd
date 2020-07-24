const router = require("express").Router();
const expense = require("../controllers/expense.controllers");

router.route("/expense").post(expense.create);

module.exports = router;
