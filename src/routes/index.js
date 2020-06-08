const router = require("express").Router();

const accountRoutes = require("./account");
const transactionRoutes = require("./transaction");
const authRoutes = require("./auth");

router.use("/", accountRoutes);
router.use("/", transactionRoutes);
router.use("/", authRoutes);

module.exports = router;
