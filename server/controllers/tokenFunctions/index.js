require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "3h" });
  },

  sendAccessToken: (res, accessToken) => {
    res.cookie("jwtAccessToken", accessToken);
  },

  isAuthorized: (req) => {
    const authorization = req.haders["cookie"];
    const token = authorization.split(";");
    const token2 = token.slice(15);
    const data = verify(token2, process.env.ACCESS_SECRET);
    return data;
  },
};
