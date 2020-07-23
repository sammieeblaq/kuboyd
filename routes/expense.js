const router = require("express").Router();
const expense = require("../controllers/expense.controllers");

router.route("/create").post(expense.create);

module.exports = router;
