const express = require("express");
const router = express.Router();
// 회원탈퇴, 회원정보수정
const withdrawalController = require("../controllers/mypages/withdrawal");
// const loginController = require("../controllers/users/login");
// const logoutController = require("../controllers/users/logout");
// const authController = require("../controllers/users/auth");

router.post("/withdrawal", withdrawalController);
// router.post("/login", loginController);
// router.get("/logout", logoutController);
// router.get("/auth", authController);

module.exports = router;
