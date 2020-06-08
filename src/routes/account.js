const router = require("express").Router();
const account = require("../controllers/account.controller");
const { auth } = require("../middleware/authorization");

// router.route("/accounts").post(account.createAccount)
router.get("/accounts", auth, account.getAccounts);

router
  .route("/account")
  .get(account.getByAccountNumber)
  .patch(account.updateAccount)
  .delete(account.removeAccount);

router.get("/account", account.getAccountById);

module.exports = router;
