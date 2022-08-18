const { cards } = require("../../models");
const { users } = require("../../models");

module.exports = {
  carduploadImage: async (req, res) => {
    console.log(req.file);
    const image = req.file.location;
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    await cards.update(
      {
        background: req.file.location,
      },
      { where: { id: req.body.cards_id } }
    );
    res.status(200).send(image);
  },
  useruploadImage: async (req, res) => {
    console.log(req.file);
    const image = req.file.location;
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    await users.update(
      {
        userphotourl: req.file.location,
      },
      { where: { id: req.body.users_id } }
    );
    res.status(200).send(image);
  },
  uploadImages: async (req, res) => {
    const image = req.files;
    const path = image.map((img) => img.location);
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    res.status(200).send(path);
  },
};
//!  "multer-s3": "^2.10.0" -> 멀터 사용시 버전 확인시켜줘야한다. 오류시 검색 호환 안될시 오류발생

// api 문서 -> card 경우 파일 + 바디에는 cards_id 와 image
// api 문서 -> user 경우 파일 + 바디에는 users_id 와 image
