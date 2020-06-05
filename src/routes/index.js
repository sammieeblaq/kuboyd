const router = require("express").Router();

const accountRoutes = require("./account");
const transactionRoutes = require("./transaction");

router.use("/", accountRoutes);
router.use("/", transactionRoutes);

module.exports = router;
