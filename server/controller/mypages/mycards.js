//userCardjoins.users_id랑 id랑 같은경우의 카드아이디 전부찾기

const { userCardJoins } = require("../../models");
const { cards } = require("../../models");
const { users } = require("../../models/");

function joinCardids(joinrecode) {
  let result = [];
  // 함수로 조인테이블 조회하기
  for (i of joinrecode) {
    const Joincardtable = i.userCardJoins.filter((el) => el);
    for (e of Joincardtable) {
      if (e.cards_id) {
        result.push(e.cards_id);
      }
    }
  }
  return result;
}

module.exports = async (req, res) => {
  //! dev 에서는 아래 주석코드 사용
  const usersId = {
    id: req.body.users_id,
  }; // client 에서 주는 아이디
  //!
  // 임의의 유저아이디
  const mycards = await cards
    .findAll({
      // where { id : iserCardjoins.cards_id }
      include: [
        {
          model: userCardJoins,
          where: {
            users_id: usersId.id, //! usersId.id 로 수정해야됌
          },
          include: [
            {
              model: users,
            },
          ],
        },
      ],
    })
    // .then((el) => console.log(el[0]));
    .then((el) => joinCardids(el));
  res.send(mycards);

  //   console.log("마이버켓에 들어갈 카드들", mycards);
};

// 나의 카드에 보여질 카드 정보들
// 카드 아이디를 조회.
