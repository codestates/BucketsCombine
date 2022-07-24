const { users } = require("../../models");

module.exports = async (req, res) => {
  const usersinfo = await users.findAll({
    attributes: { exclude: ["password"] },
  });

  res.send(usersinfo);
};
// 비밀번호 제거