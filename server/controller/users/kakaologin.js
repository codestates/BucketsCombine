require("dotenv").config();
const axios = require("axios");
const { users } = require("../../models");
const { generateAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const code = req.headers["authorization"];
  //클라이언트에서 카카오로그인인증을 한뒤 서버로 요구하는데 헤더에 인가코드를 보낸다.

  const token = await axios.post(
    `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_REST_API_KEY}&
    redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&client_secret=${process.env.KAKAO_SECRET_CODE}`,
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8", //
      },
    }
  );
  //! ****
  console.log("토큰 내용", token.data);
  const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token.data.access_token}`,
    },
  });
  // 서버는 토큰에 헤더에 담긴 토큰으로 카카오서버에 유저 정보를 요청한다.

  const newUserInfo = await users.findOrCreate({
    where: {
      email: kakaoUserInfo.data.kakao_account.email,
    },
    defaults: {
      email: `${kakaoUserInfo.data.kakao_account.email}`,
      username: kakaoUserInfo.data.kakao_account.profile.nickname,
      userphotourl: `${kakaoUserInfo.data.kakao_account.profile.profile_image}`,
      oauthlogin: "kakao",
      age: kakaoUserInfo.data.kakao_account.age_range,
      gender: kakaoUserInfo.data.kakao_account.gender,
    },
  });
  //서버는 카카오 서버에서 받은 내용을 바탕으로 새로운 유저를 탐색 및 DB에 생성
  const payload = { id: newUserInfo[0].id };
  const accessToken = generateAccessToken(payload);
  // 클라이언트에게 "jwtAccessToken"키값의 accessToken 발급. 내용물은 생성된 아이디의 id
  return res
    .status(200)
    .cookie("jwtAccessToken", accessToken, {
      httpOnly: "true",
      sameSite: "none",
      secure: "true",
    })
    .json({ token: accessToken, message: "카카오 로그인 성공" });
  //응답으로 쿠키와 상태200 그리고 메시지를 보낸다.
};
