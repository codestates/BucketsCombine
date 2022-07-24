const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  if (!isAuthorized(req, res)) {
    return;
  }
  const userid = await isAuthorized(req, res);
  const passwordcheck = await users
    .findOne({
      where: {
        id: userid.id,
        password: req.body.password,
      },
    })
    .catch((err) => {
      console.error(err);
    });
  const result = ["비밀번호가 확인되었습니다."];
  const result2 = ["비밀번호 오류"];
  //! DB 에 비밀번호 해쉬화
  //! 비밀번호 회원가입/변경시 해쉬화해서 받기
  //기본적으로 변경페이지에 들어가면 내용이 다 적혀있어야됌
  if (!passwordcheck || Object.keys(passwordcheck).length === 0) {
    console.log("비밀번호를 확인해주세요.");
    res.status(400).send(result2);
  } else {
    console.log("비밀번호가 확인되었습니다.");
    res.send(result);
  }
};
