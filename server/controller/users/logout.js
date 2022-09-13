const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const deletuser = require("./deleteuser");
module.exports = async (req, res) => {
  console.log("쿠키내역", req.cookies);
  const verify = await isAuthorized(req);
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    return res.status(400).json({ message: "이미 로그아웃되었습니다" });
  }

  const guestUser = await users.findOne({
    where: {
      oauthlogin: "guest",
      id: verify.id,
    },
  });

  console.log("게스트유저 정보", guestUser);

  if (verify) {
    if (guestUser) {
      deletuser(req.res);
    } else {
      res
        .status(200)
        .clearCookie("jwtAccessToken")
        .json({ message: `로그아웃 성공` }); // res.clearCookie(이름, [옵션]) 이름으로 지정된 쿠키를 지우는데 사용
    }
  }
};
