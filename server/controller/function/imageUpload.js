require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bucketscombine.com", //! 새로운 bucketsImage 버켓 ?
    acl: "public-read-write", //
    key: function (req, file, cb) {
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
          Date.now() +
          "." +
          file.originalname.split(".").pop()
      );
    },
  }),
  limits: {
    fileSize: 1000 * 1000 * 10,
  },
});

module.exports = upload;
// 출처: https://juhi.tistory.com/11 [주하히의 기술 블로그:티스토리]
