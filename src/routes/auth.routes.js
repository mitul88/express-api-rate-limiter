const { createUser } = require("../controller/auth.controller");

const router = require("express").Router();

router.route("/").post(createUser);

module.exports = router;
