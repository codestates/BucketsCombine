const express = require("express");
const router = express.Router();

const cardInfo = require("../controller/card/cardInfo");
const tagsinfo = require("../controller/card/hashtags");
const cardHashtags = require("../controller/card/cardHashtags");
router.get("/cardinfo", cardInfo);
router.get("/tagsinfo", tagsinfo);
router.get("/cardHashtagsinfo", cardHashtags);
module.exports = router;
