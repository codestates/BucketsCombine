const express = require("express");
const router = express.Router();

const cardInfo = require("../controller/card/cardInfo");
router.get("/cardinfo", cardInfo);
module.exports = router;
