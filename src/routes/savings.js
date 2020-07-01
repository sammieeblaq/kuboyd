const router = require("express").Router();
const saving = require("../controllers/savings.controller");

router.post("/save", saving.save);

module.exports = router;
