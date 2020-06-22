const router = require("express").Router();

const accountRoutes = require("./account");
const transactionRoutes = require("./transaction");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const { auth } = require("../middleware/authorization");

router.use("/", auth, accountRoutes);
router.use("/", auth, transactionRoutes);
router.use("/", auth, userRoutes);
// router.use("/", accountRoutes);
// router.use("/", transactionRoutes);
// router.use("/", userRoutes);
router.use("/", authRoutes);

module.exports = router;
