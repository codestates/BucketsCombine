const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  const verify = isAuthorized(req);
  if (!verify.email || !verify.username) {
    await users.findOne({
      where: { email: req.body.email, username: req.body.username },
    });
    // removeAccessToken(res).status(200).json({ message: '로그아웃 되었습니다' });
    res.status(200).clearCookie().json({ message: "로그아웃 성공" }); // res.clearCookie(이름, [옵션]) 이름으로 지정된 쿠키를 지우는데 사용
  } else {
    return res.status(400).json({ message: "이미 로그아웃되었습니다" });
  }
};
