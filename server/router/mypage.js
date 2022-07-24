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

router.post("/addstamps", addstamp);
router.post("/create", createCard);
router.post("/mycards", mycards);
router.get("/usersinfo", usersinfo);
router.delete("/deletecard", deletecard);
router.patch("/edit", edit);
router.patch("/cardsedit", cardsedit);
router.delete("/deleteuser", userdelete);

module.exports = router;
