require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // 토큰 생성(sign)
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "3h" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwtAccessToken", accessToken);
  },

  isAuthorized: (req) => {
    // const authorization = req.headers["authorization"];
    // const token = authorization.split(" ")[1];
    // return verify(token, process.env.ACCESS_SECRET);
    const authorization = req.headers["cookie"];
    const token = authorization.split(";")[0];
    const token2 = token.slice(15);
    const data = verify(token2, process.env.ACCESS_SECRET);
    return data;
  },
};

// JWT를 해독하여 얻은 payload 안의 값으로 DB에 유저를 조회합니다.
// console.log(req.headers)
// const authorization = req.headers['authorization']; // 음 뭐더라 기억이...하 .authorization 이랑 같아
// const token = authorization.split(' ')[1];
// const data = jwt.verify(token, process.env.ACCESS_SECRET);  // 해독한 값

// console.log(data)
// {
//   id: 1,
//   userId: 'kimcoding',
//   email: 'kimcoding@codestates.com',
//   createdAt: '2020-11-18T10:00:00.000Z',
//   updatedAt: '2020-11-18T10:00:00.000Z',
//   iat: 1653378438
// }
