const router = require("express").Router();
const user = require("../controllers/user.controller");

router.get("/users", user.getUsers);
router.get("/user", user.getUser);

router.route("/staff").post(user.createStaff).get(user.getStaffs);

module.exports = router;
