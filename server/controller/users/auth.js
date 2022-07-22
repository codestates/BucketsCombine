const { users } = require("../../models");
const { sign, verify } = require("jsonwebtoken");
module.exports = async (req, res) => {
<<<<<<< HEAD
  // const accessTokenData = isAuthorized(req);
  // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  // cookie jwt토큰 존재, 토큰에 유저정보 있으면 => 해당 유저 정보 리턴
  // jwt가 없는 요청, 잘못된 토큰 이면 => 응답
  // const { accessToken } = req.cookies;
  if (!accessToken) {
=======
  const { jwtAccessToken } = req.cookies;

  console.log("jwtAccessToken", jwtAccessToken);
  if (!jwtAccessToken) {
>>>>>>> 5a9316a814781f7a1dec4490fc492ab1a945a710
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
