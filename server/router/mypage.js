const express = require("express");
const router = express.Router();
const createCard = require("../controller/card/createCard");
const counting = require("../controller/mypages/counting");
// const withdrawalController = require("../controller/mypages/withdrawal");

router.post("/create", createCard); //카드 생성 및 태그 생성, 유저카드조인에 생성한 카드 추가
// router.post("/withdrawal", withdrawalController); // 회원탈퇴, 회원정보수정
router.get("/count", counting);

module.exports = router;
