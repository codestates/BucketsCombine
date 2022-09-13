const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
module.exports = async (req, res) => {
  // 로그인인지에 대한 상태가 확인이 없어요
  const hashpassword = await users.findOne({
    where: { email: req.body.email },
  });
  const result = bcrypt.compareSync(req.body.password, hashpassword.password);
  console.log("결과물 왜 트루만 나오는거야 미친", result);
  console.log("비번", hashpassword);
  console.log("리퀘비번", req.body.password);
  if (!req.body.email || !result) {
    return res.status(400).json({ message: "이메일, 비밀번호를 확인해주세요" });
  } else {
    const userinfo = await users
      .findOne({
        where: { email: req.body.email, oauthlogin: "local" }, //오스로그인이 로컬인 애들만 검색
      })
      .catch((err) => console.log(err));
    if (!userinfo) {
      return res.status(409).json({ message: "없는 사용자입니다" });
    }
    if (!result) {
      console.log(result);

      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
    } else {
      const payload = {
        id: userinfo.id,
      };

      const usersinfos = await users.findOne({
        where: {
          id: userinfo.id,
        },
        attributes: { exclude: ["password"] },
      });

      const accessToken = generateAccessToken(payload);
      sendAccessToken(res, accessToken);
      res.status(200).json({ message: "로그인 성공", userInfo: usersinfos });
    }
  }
};
