require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const https = require("https");
const fs = require("fs");
const app = express();
const port = 80;
const indexRouter = require("./router");
<<<<<<< HEAD
const port = 4000;
const indexRoute = "./route";
=======
>>>>>>> feature/server
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
<<<<<<< HEAD
const { result } = require("lodash");
require("dotenv").config();

const indexRouter = require("./router/index");

=======
const router = require("./router");

require("dotenv").config();
>>>>>>> feature/server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
<<<<<<< HEAD
    origin: ["http://localhost:3000", "http://localhost:80"],
    origin: ["http://localhost:3000"],
    // origin: true,
=======
    origin: true,
>>>>>>> feature/server
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
    allowedHeaders: ["code", "Content-Type", "authorization", "*"],
  })
);
app.use(cookieParser());
<<<<<<< HEAD

app.use("/", indexRouter);

// if (document.location.protocol == "http:") {
//   document.location.href = document.location.href.replace("http:", "https:");
// }

// const connetdb = mysql.createConnection({
// host: process.env.DATABASE_HOST, // 내가 바라보는 DB 의 주소
//   user: process.env.DATABASE_USER, // 그 DB를 사용하는 유저 (ex: user admin ...)
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME, // 내가 쓸 DB 이름
// port: process.env.DATABASE_PORT, // 만든 RDS 의 포트 (대문)
// });

// connetdb.connect(); //

// app.get("/", function (req, res) {
//   connetdb.query("SELECT * FROM card", (err, result, fields) => {
//     if (err) {
//       res.send(err);
//     }
//     res.send(result);
//   });
// });

// "hello World" 를 데이터베이스에서 찾아 변수에 저장한 뒤 사용 가능
=======
function a(req, res) {
  res.send("안녕하세요 정확한 패쓰루트를 써보세요");
}
router.get("/", a);
app.use("/", indexRouter);

>>>>>>> feature/server
app.listen(port, () => {
  console.log("server on! http://localhost:" + port);
});
