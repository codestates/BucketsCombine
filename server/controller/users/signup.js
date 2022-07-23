const { Op } = require("sequelize");
const { users } = require("../../models");

module.exports = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요" });
  } else {
    if (req.body.email.indexOf("@") === -1) {
      return res.status(400).json({ message: "이메일을 입력해주세요" });
    }

    const usercheck = await users.findOne({
      attributes: ["username", "email"],
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
      },
    });

    if (usercheck) {
      res.status(409).json({ message: "이미 사용중인 이메일 또는 유저입니다" });
    } else {
      await users.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
      });
      res.status(200).json({ message: "회원가입 성공" });
    }
  }
};
