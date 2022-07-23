const { users } = require("../../models");

module.exports = async (req, res) => {
  const userdelete = await users.destroy({
    where: {
      id: req.body.id,
    },
  });
  res.clearCookie("jwtAccessToken").send("이용해주셔서 감사했습니다.");
};
