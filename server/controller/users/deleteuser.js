const { users } = require("../../models");
const { cards } = require("../../models");
const { cardHashtags } = require("../../models");
const { userCardJoins } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  //! test code
  // const userid = { id: 35 };
  //! test code
  const userid = await isAuthorized(req);
  if (!isAuthorized(req)) {
    return;
  } else {
    await userCardJoins.destroy({
      where: {
        users_id: userid.id,
      },
    });

    const userCardId = await cards.findAll({
      where: {
        users_id: userid.id,
      },
    });
    const cardIdSet = userCardId.map((el) => el.id);
    for (el of cardIdSet) {
      await cardHashtags.destroy({
        where: { cards_id: el },
      });
      await cards.destroy({
        where: {
          id: el,
        },
      });
    }
    console.log(userid);

    await users.destroy({
      where: {
        id: userid.id,
      },
    });
    res.clearCookie("jwtAccessToken").send("이용해주셔서 감사했습니다.");
  }
};

//userid 받아서 유저 아이디에 해당하는 카드 아이디 배열로 정렬한다음
// 반복문으로 해당 인덱스에 해당하는 카드아이디의 cardHashtag id를 삭제하고
// 해당 카드를 삭제
//
