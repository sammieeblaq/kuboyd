const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.post("/signin", auth.signin);
router.post("/signup", auth.signup);
router.get("/signout", auth.signout);

module.exports = router;
