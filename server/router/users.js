const express = require("express");
const router = express.Router();

const signupController = require("../controller/users/signup");
const loginController = require("../controller/users/login");
const logoutController = require("../controller/users/logout");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);

module.exports = router;
