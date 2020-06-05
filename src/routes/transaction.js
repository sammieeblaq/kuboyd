const router = require("express").Router();
const transaction = require("../controllers/transaction.controller");

router.route("/credit").post(transaction.creditAccount);

module.exports = router;
