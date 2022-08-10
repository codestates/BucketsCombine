require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { users } = require("../../models");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "5h" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwtAccessToken", accessToken, {
      httpOnly: "true",
      SameSite: "None",
      secure: "true",
    });
  },

  isAuthorized: async (req, res) => {
    console.log("요청 받은 헤더 내역 : ", req.headers);
    if (!req.headers.cookie) {
      return res.status(401).json({ message: "권한이 없습니다" });
    }

    const authorization = req.headers.cookie;
    const token = authorization.split("=")[1];
    const decoded = verify(token, process.env.ACCESS_SECRET);
    const userInfo = await users.findByPk(decoded.id);
    if (userInfo) {
      // 관리자 검증 할 수 있는 조건, 특정 id값인지, 지정된 경로(path)인지, 지정한 메소드(get)인지
      if (userInfo.oauthlogin === "local") {
        console.log({ message: "local 로그인" });
      } else if (userInfo.oauthlogin === "google") {
        console.log({ message: "google 로그인" });
      } else if (userInfo.oauthlogin === "kakao") {
        console.log({ message: "kakao 로그인" });
      }
    } else {
      return res.status(500).json({ message: "토큰 검증에 실패하였습니다" });
    }

    return decoded;
  },
};
