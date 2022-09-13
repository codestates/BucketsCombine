const { users } = require("../../models");
module.exports = {
  emailcheck: async (req, res) => {
    const result = await users.findOne({
      where: {
        email: req.body.email,
      },
      attributes: { exclude: ["password"] },
    });
    if (result) {
      return res.json({ message: "중복된 이메일 입니다.", email: false });
    } else {
      return res.json({ message: "중복된 이메일이 없습니다.", email: true });
    }
  },
};
