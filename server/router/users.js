const express = require("express");
const router = express.Router();

const signupController = require("../controller/users/signup");
const loginController = require("../controller/users/login");
const logoutController = require("../controller/users/logout");
const kakaologin = require("../controller/users/kakaologin");
const guestlogin = require("../controller/users/guestlogin");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/kakaologin", kakaologin);
router.post("/guestlogin", guestlogin);
module.exports = router;
