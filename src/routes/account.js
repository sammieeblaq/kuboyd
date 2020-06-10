const router = require("express").Router();
const account = require("../controllers/account.controller");

router.route("/accounts").post(account.createAccount).get(account.getAccounts);

router
  .route("/account")
  .get(account.getByAccountNumber)
  .patch(account.updateAccount)
  .delete(account.removeAccount);

router.get("/accountById", account.getAccountById);

module.exports = router;
