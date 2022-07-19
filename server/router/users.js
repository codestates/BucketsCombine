const express = require("express");
const router = express.Router();

const signupController = require("../controllers/users/signup");
const loginController = require("../controllers/users/login");
const logoutController = require("../controllers/users/logout");
const authController = require("../controllers/users/auth");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/auth", authController);

module.exports = router;
