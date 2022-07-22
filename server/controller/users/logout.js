const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // const verify = isAuthorized(req);
  // const { email } = verify;
  // console.log(req);
  const verify = isAuthorized(req);
  console.log(verify);
  if (verify) {
    await users.findOne({
      where: { email: req.body.email },
    });
    // removeAccessToken(res).status(200).json({ message: '로그아웃 되었습니다' });
    res
      .status(200)
      .clearCookie("jwtAccessToken")
      .json({ message: "로그아웃 성공" }); // res.clearCookie(이름, [옵션]) 이름으로 지정된 쿠키를 지우는데 사용
  } else {
    return res.status(400).json({ message: "이미 로그아웃되었습니다" });
  }
};

// { email: 'test2223@naver.com', iat: 1658457167, exp: 1658475167 } // iat 토큰 발급 시간, exp 토큰 만료 시간
// 왜 바디가 비어있으면 안될까... (토큰, 바디) 둘다 보내야되??
// 삭제가 되었다면 쿠키가 비어있을테니
