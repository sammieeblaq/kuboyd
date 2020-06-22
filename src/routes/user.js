const router = require("express").Router();
const user = require("../controllers/user.controller");

router.get("/users", user.getUsers);
router.get("/user", user.getUser);
router.post("/create-staff", user.createStaff);

module.exports = router;
