const { users } = require("../../models");
module.exports = async (req, res) => {
  const usersinfo = await users.update({});
};
