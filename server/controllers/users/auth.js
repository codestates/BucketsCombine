const { user } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // const accessTokenData = isAuthorized(req);
  // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  // cookie jwt토큰 존재, 토큰에 유저정보 있으면 => 해당 유저 정보 리턴
  // jwt가 없는 요청, 잘못된 토큰 이면 => 응답

  if (!req.headers.cookie) {
    //
    console.log("--------", req.headers.cookie);
    res.status(401).send({ data: null, message: "not authorized" });
  } else {
    const userinfo = await user.findOne({
      where: { email: isAuthorized(req).email },
    });

    if (!userinfo) {
      res.status(401).send();
    } else {
      const userInfo = {
        email: userinfo.email,
        username: userinfo.username,
        mobile: userinfo.mobile,
        createdAt: userinfo.createdAt,
        updatedAt: userinfo.updatedAt,
      };
      res.status(200).send({ data: { userInfo } });
    }
  }
};
