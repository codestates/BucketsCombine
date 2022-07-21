const express = require("express");
const router = express.Router();

const cardInfo = require("../controller/card/cardInfo");
const tagsinfo = require("../controller/card/hashtags");
const cardHashtags = require("../controller/card/cardHashtags");
const userCardJoins = require("../controller/card/userCardJoins");
const userCardJoinsdelete = require("../controller/card/userCardJoinsdelete");

router.get("/cardinfo", cardInfo);
router.get("/tagsinfo", tagsinfo);
router.get("/cardHashtagsinfo", cardHashtags);
router.post("/userCardJoins", userCardJoins);
router.delete("/userCardJoinsdelete", userCardJoinsdelete);
module.exports = router;
