require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // 토큰 생성(sign)
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "5h" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwtAccessToken", accessToken);
  },

  isAuthorized: (req) => {
    // const authorization = req.headers["authorization"];
    // const token = authorization.split(" ")[1];
    // return verify(token, process.env.ACCESS_SECRET);

    // const authorization = req.headers["authorization"];
    // if (!authorization) return null;
    // const token = authorization.split(" ")[2];
    // if (!token) return null;
    // return verify(token, process.env.ACCESS_SECRET);
    const authorization = req.headers.cookie;
    console.log("------", authorization); // ------ undefined 로그아웃 두번 눌렀을 시. 메세지가 안뜨는데 일단 로그아웃 두번 눌를일 없다 생각하고 넘어가
    const token = authorization.split("=")[1];
    return verify(token, process.env.ACCESS_SECRET);
  },
};
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
