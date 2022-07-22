const { users } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // const accessTokenData = isAuthorized(req);
  // TODO: 로그인 여부를 판단하고, Access token payload를 이용하여 응답을 제공하세요.
  // cookie jwt토큰 존재, 토큰에 유저정보 있으면 => 해당 유저 정보 리턴
  // jwt가 없는 요청, 잘못된 토큰 이면 => 응답
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({ message: "권한이 없습니다" });
  } else {
    const decoded = verify(accessToken, process.env.ACCESS_SECRET);
    const userInfo = await users.findByPk(decoded.id);
    if (userInfo) {
      // 관리자 검증 할 수 있는 조건
      // 특정 id값인지, 지정된 경로(path)인지, 지정한 메소드(get)인지
      if (
        req.id !== parseInt(process.env.DB_ADMIN_ID) &&
        req.originalUrl === "/" &&
        req.route.stack[0].method !== "get"
      ) {
        return res.status(401).json({ message: "관리자 권한이 없습니다" });
      } else {
        return res.status(401).json({ message: "유효한 요청이 아닙니다" });
      }
    } else {
      return res.status(500).json({ message: "토큰 검증에 실패하였습니다" });
    }
  }

  // if (!req.headers.cookie) {
  //   //
  //   console.log("--------", req.headers.cookie);
  //   res.status(401).send({ data: null, message: "권한이 없습니다" });
  // } else {
  //   const userinfo = await user.findOne({
  //     where: { email: isAuthorized(req).email },
  //   });

  //   if (!userinfo) {
  //     res.status(401).send();
  //   } else {
  //     const userInfo = {
  //       email: userinfo.email,
  //       username: userinfo.username,
  //       createdAt: userinfo.createdAt,
  //       updatedAt: userinfo.updatedAt,
  //     };
  //     res.status(200).send({ data: { userInfo } });
  //   }
  // }
};
