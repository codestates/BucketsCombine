const express = require("express");
const router = express.Router();

const signupController = require("../controller/users/signup");
const loginController = require("../controller/users/login");
const logoutController = require("../controller/users/logout");
// const kakaologin = require("../controller/users/kakaologin");
const guestlogin = require("../controller/users/guestlogin");

function a(req, res) {
  res.send("안녕하세요 정확한 패쓰루트를 써보세요");
}
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/kakaologin", a);
// router.post("/kakaologin", kakaologin);
router.post("/guestlogin", guestlogin);
module.exports = router;
