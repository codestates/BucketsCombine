const express = require("express");
const router = express.Router();

<<<<<<< HEAD
// const signupController = require("../controllers/users/signup");
// const loginController = require("../controllers/users/login");
// const logoutController = require("../controllers/users/logout");
// const kakaoController = require("../controllers/users/kakaoLogin");

// app.use("/auth", controllers.auth);
// app.use("/signup", controllers.signup);
// app.use("/signin", controllers.signin);
// app.use("/signout", controllers.signout);
const signupController = require("../controllers/users/signup");
const loginController = require("../controllers/users/login");
const logoutController = require("../controllers/users/logout");
const authController = require("../controllers/users/auth");

router.post("/signup", signupController);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.get("/auth", authController);
=======
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
router.post("/kakaologin", kakaologin.kakaologins);
router.post("/guestlogin", guestlogin);
router.post("/googlelogin", googlelogin);

router.post("/sendemail", sendemail.sendemail);
>>>>>>> feature/server

router.post("/emailcheck", emailcheck.emailcheck);
module.exports = router;
