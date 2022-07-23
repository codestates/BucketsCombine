const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  if (!isAuthorized(req)) {
    return;
  }
  const usersinfo = await users
    .update(
      {
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
        usertext: req.body.usertext,
        userphotourl: req.body.userphotourl,
      },
      { where: { email: req.body.email } }
    )
    .then((data) => {
      res.send("수정되었습니다");
    })
    .catch((err) => {
      console.error(err);
    });

  //기본적으로 변경페이지에 들어가면 내용이 다 적혀있어야됌
  res.send(usersinfo);
};
