const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
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

// { email: 'test2223@naver.com', iat: 1658457167, exp: 1658475167 } // iat 토큰 발급 시간, exp 토큰 만료 시간
// 왜 바디가 비어있으면 안될까... (토큰, 바디) 둘다 보내야되??
// 삭제가 되었다면 쿠키가 비어있을테니

// console.log(req.cookie); // undefined
// console.log(req.cookies)
// {
//   jwtAccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMTFAbmF2ZXIuY29tIiwiaWF0IjoxNjU4NTExMzgxLCJleHAiOjE2NTg1MjkzODF9.mwTs61IsJnF7Q_skYYdpGai4jC4CQa048_ulinmOxwY'
// }
