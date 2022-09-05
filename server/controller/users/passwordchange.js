const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  if (!isAuthorized(req, res)) {
    return;
  } else {
    const userid = await isAuthorized(req, res);
    const salt = await bcrypt.genSalt(10); //  기본이 10번이고 숫자가 올라갈수록 연산 시간과 보안이 높아진다.
    const password = await bcrypt.hash(req.body.password, salt);
    await users
      .update(
        {
          password: password,
        },
        { where: { id: userid.id } }
      )
      .catch((err) => {
        console.error(err);
      });

    //기본적으로 변경페이지에 들어가면 내용이 다 적혀있어야됌
    res.send("패스워드가 변경되었습니다.");
  }
};
