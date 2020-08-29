const router = require("express").Router();
const saving = require("../controllers/save.controllers.js");

router.post("/save", saving.save);

module.exports = router;
