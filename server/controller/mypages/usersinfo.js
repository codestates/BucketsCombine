const { users } = require("../../models");

module.exports = async (req, res) => {
  const usersinfo = await users.findAll({});
  const payload = {
    id: usersinfo.id,
    username: usersinfo.username,
    email: usersinfo.email,
    usertext: usersinfo.usertext,
    oauthlogin: usersinfo.oauthlogin,
    userphotourl: usersinfo.userphotourl,
    gender: usersinfo.gender,
    age: usersinfo.age,
    createdAt: usersinfo.createdAt,
    updatedAt: usersinfo.updatedAt,
  };

  res.send(payload);
};

// 비밀번호 제거
