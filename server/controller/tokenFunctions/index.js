require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const { users } = require("../../models");

module.exports = {
  // 토큰 생성(sign)
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "5h" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwtAccessToken", accessToken);
  },

  isAuthorized: async (req, res) => {
    if (!req.headers.cookie) {
      return res.status(401).json({ message: "권한이 없습니다" });
    }

    const authorization = req.headers.cookie;
    const token = authorization.split("=")[1];
    const decoded = verify(token, process.env.ACCESS_SECRET);
    const userInfo = await users.findByPk(decoded.id);
    if (userInfo) {
      // 관리자 검증 할 수 있는 조건
      // 특정 id값인지, 지정된 경로(path)인지, 지정한 메소드(get)인지
      if (userInfo.oauthlogin === "local") {
        console.log({ message: "local 로그인" });
      } else if (userInfo.oauthlogin === "google") {
        console.log({ message: "google 로그인" });
      } else if (userInfo.oauthlogin === "kakao") {
        console.log({ message: "kakao 로그인" });
      }
    } else {
      return res.status(500).json({ message: "토큰 검증에 실패하였습니다" });
    }

    return decoded;
  },
};

// module.exports = async (req, res) => {
//   const { jwtAccessToken } = req.cookies;

//   console.log("jwtAccessToken", jwtAccessToken);
//   if (!jwtAccessToken) {
//     return res.status(401).json({ message: "권한이 없습니다" });
//   } else {
//     const decoded = verify(jwtAccessToken, process.env.ACCESS_SECRET);
//     const userInfo = await users.findByPk(decoded.id);
//     if (userInfo) {
//       // 관리자 검증 할 수 있는 조건
//       // 특정 id값인지, 지정된 경로(path)인지, 지정한 메소드(get)인지
//       if (userInfo.oauthlogin === "local") {
//         return res.json({ message: "local 로그인" });
//       } else if (userInfo.oauthlogin === "google") {
//         return res.json({ message: "google 로그인" });
//       } else if (userInfo.oauthlogin === "kakao") {
//         return res.json({ message: "kakao 로그인" });
//       }
//     } else {
//       return res.status(500).json({ message: "토큰 검증에 실패하였습니다" });
//     }
//   }
// };

// JWT를 해독하여 얻은 payload 안의 값으로 DB에 유저를 조회합니다.
// console.log(req.headers)
// const authorization = req.headers['authorization']; // .authorization 이랑 같아
// const token = authorization.split(' ')[1];
// const data = jwt.verify(token, process.env.ACCESS_SECRET);  // 해독한 값

// console.log("sendAccessToken", req.headers)
// sendAccessToken {
//   authorization: "Bearer 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoia2ltY29kaW5nIiwiZW1haWwiOiJraW1jb2RpbmdAY29kZXN0YXRlcy5jb20iLCJjcmVhdGVkQXQiOiIyMDIwLTExLTE4VDEwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTExLTE4VDEwOjAwOjAwLjAwMFoiLCJpYXQiOjE2NTMzNzUyNzJ9.60Lcf0W7Ish7nlYBjKb-WMjmnSnoeyHISmcEu0LBQTU'",
//   'content-type': 'application/json',
//   'user-agent': 'PostmanRuntime/7.29.0',
//   accept: '*/*',
//   'postman-token': '93ca3455-c793-42a7-8cc7-9df29861d02f',
//   'accept-encoding': 'gzip, deflate, br',
//   connection: 'keep-alive',
//   'content-length': '66',
//   cookie: 'jwtAccessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyMjIzQG5hdmVyLmNvbSIsImlhdCI6MTY1ODQ1MDc3NiwiZXhwIjoxNjU4NDYxNTc2fQ.2odHMetuG4GZ702LvnuD1lupyEpjlsN8kc7Vp9umIGw'
// }

// console.log("sendAccessToken", req.headers["authorization"])
// sendAccessToken Bearer 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoia2ltY29kaW5nIiwiZW1haWwiOiJraW1jb2RpbmdAY29kZXN0YXRlcy5jb20iLCJjcmVhdGVkQXQiOiIyMDIwLTExLTE4VDEwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTExLTE4VDEwOjAwOjAwLjAwMFoiLCJpYXQiOjE2NTMzNzUyNzJ9.60Lcf0W7Ish7nlYBjKb-WMjmnSnoeyHISmcEu0LBQTU'

// console.log("sendAccessToken", req.headers["authorization"].split(" ")[1]);
// sendAccessToken 'Bearer

// console.log ("sendAccessToken", req.headers["authorization"].split(" ")[2]);
// sendAccessToken eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoia2ltY29kaW5nIiwiZW1haWwiOiJraW1jb2RpbmdAY29kZXN0YXRlcy5jb20iLCJjcmVhdGVkQXQiOiIyMDIwLTExLTE4VDEwOjAwOjAwLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTExLTE4VDEwOjAwOjAwLjAwMFoiLCJpYXQiOjE2NTMzNzUyNzJ9.60Lcf0W7Ish7nlYBjKb-WMjmnSnoeyHISmcEu0LBQTU'
