const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const mypagesRouter = require("./mypage");
const mainRouter = require("./mainpage");
const imageEdit = require("./imageEdit");

router.use("/mainpage", mainRouter);
router.use("/mypage", mypagesRouter);
<<<<<<< HEAD
// router.use("/users", usersRouter);
// router.use("/mypages", mypagesRouter);

router.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello World");
});

router.use("/users", usersRouter);
// router.use("/mypages", mypagesRouter);
// router.use("/mainpage", mainRouter);
//
=======
router.use("/users", usersRouter);

router.use("/image", imageEdit);

// router.use("/mainpage", mainRouter);
>>>>>>> feature/server
module.exports = router;
