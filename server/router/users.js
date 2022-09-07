const express = require("express");
const router = express.Router();

const signupController = require("../controller/users/signup");
const loginController = require("../controller/users/login");
const logoutController = require("../controller/users/logout");
const kakaologin = require("../controller/users/kakaologin");
const guestlogin = require("../controller/users/guestlogin");
const googlelogin = require("../controller/users/googlelogin");
const emailcheck = require("../controller/users/emailcheck");
const sendemail = require("../controller/users/sendemail");
function a(req, res) {
  res.send("안녕하세요 정확한 패쓰루트를 써보세요");
}
router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/kakaologin", kakaologin);
router.post("/guestlogin", guestlogin);
router.post("/googlelogin", googlelogin);
router.post("/sendemail", sendemail)

router.post("/emailcheck", emailcheck.emailcheck);
module.exports = router;
