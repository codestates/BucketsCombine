const express = require("express");
const router = express.Router();

const createCard = require("../controller/card/createCard");
const mycards = require("../controller/mypages/mycards");
const usersinfo = require("../controller/mypages/usersinfo");
const addstamp = require("../controller/mypages/addstamps");
const deletecard = require("../controller/mypages/deletecard");
const edit = require("../controller/users/edit");
const cardsedit = require("../controller/card/edit");
const userdelete = require("../controller/users/deleteuser.js");
const passwordchange = require("../controller/users/passwordchange.js");
const passwordcheck = require("../controller/users/passwordcheck.js");

router.post("/addstamps", addstamp);
router.post("/create", createCard); //카드 생성 및 태그 생성, 유저카드조인에 생성한 카드 추가
router.post("/mycards", mycards); //get 으로바꿔야댐
router.patch("/cardsedit", cardsedit);
router.delete("/deletecard", deletecard);

router.post("/passwordcheck", passwordcheck);
router.patch("/passwordchange", passwordchange);
router.patch("/edit", edit);
router.get("/usersinfo", usersinfo);
router.delete("/deleteuser", userdelete);

module.exports = router;
