const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "이메일, 비밀번호를 확인해주세요" });
  } else {
    const userinfo = await users.findOne({
      where: { email: req.body.email },
    });
    if (!userinfo) {
      return res.status(409).json({ message: "없는 사용자입니다" });
    }
    if (req.body.password !== userinfo.password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
    } else {
      const payload = {
        email: userinfo.email,
      };

      const accessToken = generateAccessToken(payload);
      sendAccessToken(res, accessToken);
      console.log("sendAccessToken", sendAccessToken(res, accessToken)); // sendAccessToken undefined
      res.status(200).json({ message: "로그인 성공" });
    }
  }
};
