const { users } = require("../../models");
const { generateAccessToken, sendAccessToken } = require("../tokenFunctions");

module.exports = async (req, res) => {
  // 로그인인지에 대한 상태가 확인이 없어요
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "이메일, 비밀번호를 확인해주세요" });
  } else {
    const userinfo = await users
      .findOne({
        where: { email: req.body.email },
      })
<<<<<<< HEAD
      .catch((err) => {
        console.log(err);
      });
=======
      .catch((err) => console.log(err));
>>>>>>> 5a9316a814781f7a1dec4490fc492ab1a945a710
    if (!userinfo) {
      return res.status(409).json({ message: "없는 사용자입니다" });
    }
    if (req.body.password !== userinfo.password) {
      console.log(req.body.password);
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다" });
    } else {
      const payload = {
        id: userinfo.id,
      };

      const usersinfos = await users.findOne({
        where: {
          id: userinfo.id,
        },
        attributes: { exclude: ["password"] },
      });

      const accessToken = generateAccessToken(payload);
      sendAccessToken(res, accessToken);
      res.status(200).json({ message: "로그인 성공", userInfo: usersinfos });
    }
  }
};
