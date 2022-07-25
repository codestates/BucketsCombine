const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  if (!isAuthorized(req, res)) {
    return;
}else{
const userid = await isAuthorized(req, res);
  await users
    .update(
      {
        password: req.body.password,
      },
      { where: { id: req.body.users_id } }
    )
    .catch((err) => {
      console.error(err);
    });

  //기본적으로 변경페이지에 들어가면 내용이 다 적혀있어야됌
  res.send("패스워드가 변경되었습니다.");
}
};
