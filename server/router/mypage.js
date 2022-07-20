const express = require("express");
const router = express.Router();
const createCard = require("../controller/card/createCard");
// const withdrawalController = require("../controller/mypages/withdrawal");
const mycards = require("../controller/mypages/mycards");
router.post("/create", createCard); //카드 생성 및 태그 생성, 유저카드조인에 생성한 카드 추가
const abcd = require("../controller/mypages/withdrawal");
// router.post("/withdrawal", withdrawalController); // 회원탈퇴, 회원정보수정
router.get("/mycards", mycards);
router.get("/withdrawal", abcd);
module.exports = router;
