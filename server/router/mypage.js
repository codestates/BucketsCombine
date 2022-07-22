const express = require("express");
const router = express.Router();

const createCard = require("../controller/card/createCard");
const mycards = require("../controller/mypages/mycards");
const usersinfo = require("../controller/mypages/usersinfo");
const addstamp = require("../controller/mypages/addstamps");
const deletecard = require("../controller/mypages/deletecard");
const edit = require("../controller/users/edit");
const cardsedit = require("../controller/card/edit");
const userdelete = require("../controller/users/userdelete.js");

router.post("/addstamps", addstamp);
router.post("/create", createCard); //카드 생성 및 태그 생성, 유저카드조인에 생성한 카드 추가
router.post("/mycards", mycards);
router.get("/usersinfo", usersinfo);
router.delete("/deletecard", deletecard);
router.patch("/edit", edit);
router.patch("/cardsedit", cardsedit);
router.delete("/delete", userdelete);
module.exports = router;
