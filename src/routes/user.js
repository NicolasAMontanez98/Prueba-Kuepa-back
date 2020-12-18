const router = require("express").Router();
const { login, register, getInfo } = require("../controller/user.controller");
const { getAuth } = require("../util/middlewares");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/").get(getAuth, getInfo);

module.exports = router;
