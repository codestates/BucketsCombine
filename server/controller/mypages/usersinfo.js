const { users } = require("../../models");

module.exports = async (req, res) => {
  const usersinfo = await users.findAll({});
  res.send(usersinfo);
};

// 비밀번호 제거
