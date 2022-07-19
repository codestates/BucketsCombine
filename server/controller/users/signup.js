const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "모든 항목을 입력해주세요" });
  } else {
    const [userinfo, created] = await users.findOrCreate({
      where: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!created) {
      res.status(409).json({ message: "이미 사용중인 이메일입니다" });
    } else {
      const payload = {
        username: userinfo.username,
        email: userinfo.email,
      };

      const accessToken = generateAccessToken(payload);
      sendAccessToken(res, accessToken);

      res.status(200).json({ message: "회원가입 성공" });
    }
  }
};
