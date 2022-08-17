const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploadimages/" });

const ImageUpload = require("../controller/function/ImageUpload");
const util = require("../controller/function/util");

router.post(
  "/cardImageUpload",
  ImageUpload.single("image"),
  util.carduploadImage
);
router.post(
  "/userImageUpload",
  ImageUpload.single("image"),
  util.useruploadImage
);

module.exports = router;
