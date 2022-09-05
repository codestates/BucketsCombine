const { Op } = require("sequelize");
const { users } = require("../../models");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  const salt = await bcrypt.genSalt(10); //  기본이 10번이고 숫자가 올라갈수록 연산 시간과 보안이 높아진다.
  const password = await bcrypt.hash(req.body.password, salt);
  if (!req.body.username || !req.body.email || !password) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요" });
  } else {
    if (req.body.email.indexOf("@") === -1) {
      return res.status(400).json({ message: "이메일을 입력해주세요" });
    }

    const emailCheck = await users.findOne({
      attributes: ["email"],
      where: {
        email: req.body.email,
      },
    });
    const usernameCheck = await users.findOne({
      attributes: ["username"],
      where: {
        username: req.body.username,
      },
    });
    // [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
    if (emailCheck || usernameCheck) {
      if (emailCheck && usernameCheck) {
        return res.status(200).json({
          message1: "이미 사용중인 이메일입니다",
          message2: "이미 사용중인 별명입니다",
        });
      }
      if (emailCheck) {
        return res.status(200).json({ message: "이미 사용중인 이메일입니다" });
      }
      if (usernameCheck) {
        return res.status(200).json({ message: "이미 사용중인 별명입니다" });
      }
    } else {
      await users.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        age: req.body.age,
        gender: req.body.gender,
      });
      res.status(200).json({ message: "회원가입 성공" });
    }
  }
};
