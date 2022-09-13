require("dotenv").config();
const axios = require("axios");
const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  console.log("구글 헤더", req.headers);
  const code = req.headers["code"];
  const token = await axios
    .post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=${process.env.GOOGLE_GRANT_TYPE}`,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8", //
        },
      }
    )
    .catch((e) => console.log("에러", e));

  const googleAPI = `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token.data.access_token}`;
  const userInfo = await axios
    .get(googleAPI, {
      headers: {
        authorization: `Bearer ${token.data.access_token}`,
      },
    })
    .catch((err) => {
      console.log("err=", err);
    });
  console.log("유저 인포", userInfo.data.email);

  const useremail = await users.findOrCreate({
    where: {
      email: userInfo.data.email,
      oauthlogin: "Google",
    },
    defaults: {
      email: `${userInfo.data.email}`,
      oauthlogin: "Google",
    },
  });
  const payload = { id: useremail[0].id };
  const accessToken = generateAccessToken(payload);
  const usersinfos = await users.findOne({
    where: {
      id: payload.id,
    },
    attributes: { exclude: ["password"] },
  });

  sendAccessToken(res, accessToken);
  return res
    .status(200)
    .json({ message: "Google 로그인 성공", userInfo: usersinfos });
};

//'https://people.googleapis.com/v1/people/me'

//'https://people.googleapis.com/v1/people/me'
// {"web":{"client_id":"1060131014231-tve2t0aclc6tjopc0okifv8k1kag7geo.apps.googleusercontent.com",
// "project_id":"bucketscombine","auth_uri":"https://accounts.google.com/o/oauth2/auth",
// "token_uri":"https://oauth2.googleapis.com/token",
// "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
// "redirect_uris":["https://www.bucketscombine.com/users/googlelogin"],
// "javascript_origins":["https://www.bucketscombine.com"]}}
//! 클라이언트 scope=https://www.googleapis.com/auth/userinfo.email
