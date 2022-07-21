const { users } = require("../../models");

module.exports = async (req, res) => {
  const usersabcd = await users.findAll({});
  res.send(usersabcd);
};
