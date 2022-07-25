const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
	console.log(req.body)
	console.log(req.headers)
  console.log(req.cookies);
  if (!req.cookies || Object.keys(req.cookies).length === 0) {
    return res.status(400).json({ message: "이미 로그아웃되었습니다" });
  }
  const verify = await isAuthorized(req);
  if (verify) {
    res
      .status(200)
      .clearCookie("jwtAccessToken")
      .json({ message: `로그아웃 성공` }); // res.clearCookie(이름, [옵션]) 이름으로 지정된 쿠키를 지우는데 사용
  }
};
