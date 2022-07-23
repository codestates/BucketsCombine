const { users } = require("../../models");
const { sign, verify } = require("jsonwebtoken");
module.exports = async (req, res) => {
  const { jwtAccessToken } = req.cookies;

  console.log("jwtAccessToken", jwtAccessToken);
  if (!jwtAccessToken) {
    return res.status(401).json({ message: "권한이 없습니다" });
  } else {
    const decoded = verify(jwtAccessToken, process.env.ACCESS_SECRET);
    const userInfo = await users.findByPk(decoded.id);
    if (userInfo) {
      // 관리자 검증 할 수 있는 조건
      // 특정 id값인지, 지정된 경로(path)인지, 지정한 메소드(get)인지
      if (userInfo.oauthlogin === "local") {
        return res.json({ message: "local 로그인" });
      } else if (userInfo.oauthlogin === "google") {
        return res.json({ message: "google 로그인" });
      } else if (userInfo.oauthlogin === "kakao") {
        return res.json({ message: "kakao 로그인" });
      }
    } else {
      return res.status(500).json({ message: "토큰 검증에 실패하였습니다" });
    }
  }
};
