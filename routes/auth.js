const router = require("express").Router();
const auth = require("../controllers/auth.controller");
// const validate = require("../utils/validate.utils");

router.post("/login", auth.signIn);
router.post("/signup", auth.signUp);
router.get("/logout", auth.signOut);
router.post("/reset", auth.resetPassword);

module.exports = router;
