require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 80;
const indexRoute = "./route";
const mysql = require("mysql");
// const controllers = require("./controllers");
const cookieParser = require("cookie-parser");
const { result } = require("lodash");
require("dotenv").config();

const indexRouter = require("./routes/index");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", indexRoute);

// if (document.location.protocol == "http:") {
//   document.location.href = document.location.href.replace("http:", "https:");
// }

// const connetdb = mysql.createConnection({
//   host: process.env.DATABASE_HOST, // 내가 바라보는 DB 의 주소
//   user: process.env.DATABASE_USER, // 그 DB를 사용하는 유저 (ex: user admin ...)
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME, // 내가 쓸 DB 이름
//   port: process.env.DATABASE_PORT, // 만든 RDS 의 포트 (대문)
// });

// connetdb.connect(); //

// app.get("/", function (req, res) {
//   connetdb.query("SELECT * FROM test", (err, result, fields) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send(result);
//   });
// });

// "hello World" 를 데이터베이스에서 찾아 변수에 저장한 뒤 사용 가능
app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});
