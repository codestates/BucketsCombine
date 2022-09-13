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
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const router = require("./router");

require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE", "PATCH"],
    allowedHeaders: ["code", "Content-Type", "authorization", "*"],
  })
);
app.use(cookieParser());
function a(req, res) {
  res.send("안녕하세요 정확한 패쓰루트를 써보세요");
}
router.get("/", a);
app.use("/", indexRouter);

app.listen(port, () => {
  console.log("server on! http://localhost:" + port);
});
