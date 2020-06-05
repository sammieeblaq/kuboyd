const router = require("express").Router();

const accountRoutes = require("./account");

router.use("/", accountRoutes);

module.exports = router;
