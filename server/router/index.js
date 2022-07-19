const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const mypagesRouter = require("./mypage");
// const mainRouter = require("./mainpage");

router.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello World");
});

router.use("/users", usersRouter);
router.use("/mypages", mypagesRouter);
// router.use("/mainpage", mainRouter);
//
module.exports = router;
