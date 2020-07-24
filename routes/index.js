const router = require("express").Router();
const { auth } = require("../middleware/authorization");

// router.get("/", (req, res) => res.redirect("/accounts"));

router.use("/", require("./auth"));
router.use("/", auth, require("./account"));
router.use("/", auth, require("./transaction"));
router.use("/", auth, require("./user"));
router.use("/", auth, require("./savings"));
router.use("/", auth, require("./expense"));
// router.use("/", require("./account"));
// router.use("/", require("./transaction"));
// router.use("/", require("./savings"));
// router.use("/", require("./expense"));
// router.use("/", require("./user"));

module.exports = router;
