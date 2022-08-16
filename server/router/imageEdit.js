const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploadimages/" });

const imageUpload = require("../controller/function/imageUpload");
const util = require("../controller/function/util");

router.post("/imageUpload", imageUpload.single("image"), util.uploadImage);

module.exports = router;
