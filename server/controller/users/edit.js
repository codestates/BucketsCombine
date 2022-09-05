const { Op } = require("sequelize");
const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

let emailIsGannaCheck = false
let usernameIsGannaCheck = false
module.exports = async (req, res) => {
  if (!isAuthorized(req)) {
    return;
  }

  if(req.body.email === '#no change'){
    emailIsGannaCheck = false
  } else {
    emailIsGannaCheck = true
  }

  if(req.body.username === '#no change'){
    usernameIsGannaCheck = false
  } else  {
    usernameIsGannaCheck = true
  }


    const emailCheck = emailIsGannaCheck? await users.findOne({
      attributes: ["email"],
      where: {
        email: req.body.email,
      },
    }) : false

    const usernameCheck = usernameIsGannaCheck? await users.findOne({
      attributes: ["username"],
      where: {
        username: req.body.username,
      },
    }) : false
  
 
  // [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
  if (emailCheck || usernameCheck) {
    if (emailCheck && usernameCheck) {
      return res
        .status(200)
        .json({
          email: false,
          username: false,
        });
    }
    if (emailCheck) {
      return res.status(200).json({ email: false, username: true });
    }
    if (usernameCheck) {
      return res.status(200).json({ email: true, username: false });
    }
  } else {

    const userinfo = await isAuthorized(req, res); //userid 였었던 변수
    const usersinfo = await users
    .update(
      {
        username: usernameIsGannaCheck? req.body.username : userinfo.username ,
        age: req.body.age,
        gender: req.body.gender,
        usertext: req.body.usertext,
        userphotourl: req.body.userphotourl,
        email: emailIsGannaCheck? req.body.email : userinfo.email,
      },
      { where: { id: userinfo.id } }
    )
    .catch((err) => {
      console.error(err);
    });
  res.send("유저정보가 수정되었습니다");
  //기본적으로 변경페이지에 들어가면 내용이 다 적혀있어야됌
  }
};


// id로 찾아서 이메일도 변경가능하고 ,
// 이메일이 중복일 경우 객체를 보내준다 
// 응답 객체 { email: , username: , } 이메일 중복이면 email: false

// 요청 정보가 id로 찾은 정보와 같다면 객체 응답
// 요청 이메일, 유저네임 pharse