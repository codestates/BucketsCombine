const { users } = require("../../models");

module.exports = async (req, res) => {
  const usersinfo = await users.findAll({});
  res.send(usersinfo);
};

// 비밀번호 제거
// 유저정보로 데이터를 다룰때는 무조건 서버쪽에서
