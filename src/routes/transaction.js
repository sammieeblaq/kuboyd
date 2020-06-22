const router = require("express").Router();
const transaction = require("../controllers/transaction.controller");

router.post("/credit", transaction.creditAccount);
router.post("/transfer", transaction.transferToAccount);
router.get("/transactions", transaction.getTransactions);

router
  .route("/transaction")
  .get(transaction.getTransactionById)
  .delete(transaction.removeTransaction);

module.exports = router;
