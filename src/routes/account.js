const router = require("express").Router();
const account = require("../controllers/account.controller");

router.route("/accounts").post(account.createAccount).get(account.getAccounts);

router
  .route("/account")
  .get(account.getAccountById)
  .get(account.getAccountByAccountNumber)
  .get(account.getAccountByAccountName)
  .patch(account.updateAccount)
  .delete(account.removeAccount);

module.exports = router;
