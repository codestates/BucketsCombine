const { users } = require("../../models");
const { userCardJoins } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  const userid = await isAuthorized(req);
  if (!isAuthorized(req)) {
    return;
  } else {
    console.log(userid);
    await userCardJoins.destroy({
      where: {
        users_id: userid.id,
      },
    });
    await users.destroy({
      where: {
        id: userid.id,
      },
    });
    res.clearCookie("jwtAccessToken").send("이용해주셔서 감사했습니다.");
  }
};
