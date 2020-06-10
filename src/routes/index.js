const router = require("express").Router();

const accountRoutes = require("./account");
const transactionRoutes = require("./transaction");
const authRoutes = require("./auth");
const { auth } = require("../middleware/authorization");

router.use("/", auth, accountRoutes);
router.use("/", auth, transactionRoutes);
router.use("/", authRoutes);

module.exports = router;
