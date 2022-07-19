const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const mypagesRouter = require("./mypage");
const mainRouter = require("./mainpage");

router.use("/mainpage", mainRouter);
router.use("/mypage", mypagesRouter);
router.use("/users", usersRouter);

// router.use("/mainpage", mainRouter);
//
module.exports = router;
