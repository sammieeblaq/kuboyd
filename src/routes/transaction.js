const router = require("express").Router();
const transaction = require("../controllers/transaction.controller");

router.post("/credit", transaction.creditAccount);
router.post("/transfer", transaction.transferToAccount);

module.exports = router;
