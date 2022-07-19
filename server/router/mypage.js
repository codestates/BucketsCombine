const express = require("express");
const router = express.Router();
const createCard = require("../controller/card/createCard");
//카드 생성 및 태그 생성, 유저카드조인에 생성한 카드 추가
router.post("/create", createCard);
// 회원탈퇴, 회원정보수정
const withdrawalController = require("../controllers/mypages/withdrawal");
router.post("/withdrawal", withdrawalController);

module.exports = router;
