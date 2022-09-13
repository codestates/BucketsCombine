const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // 로그인인지에 대한 상태가 확인이 없어요
  await users.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    oauthlogin: "guest",
  });
  const userinfo = await users
    .findOne({
      where: {
        email: req.body.email,
      },
      attributes: { exclude: ["password"] },
    })
    .catch((err) => console.log(err));

  const payload = {
    id: userinfo.id,
  };

  const accessToken = generateAccessToken(payload);
  sendAccessToken(res, accessToken);
  res.status(200).json({ message: "로그인 성공", userInfo: userinfo });
};

// 게스트 로그인시 회원가입하면서 로그인 시키고 res로 유저정보 담아주기
// post 요청 users/guestlogin
