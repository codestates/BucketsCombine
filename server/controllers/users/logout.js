const { users } = require("../../models");

module.exports = (req, res) => {
  res.status(205).json({ message: "로그아웃 성공" });
};
