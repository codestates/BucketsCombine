const { cards } = require("../../models");
const { cardHashtags } = require("../../models");
const { hashtags } = require("../../models");
module.exports = async (req, res) => {
  const cardinfo = await cards.findAll({});
  const cardHashtagsa = await cardHashtags.findAll({});
  const arr = [];
  console.log(cardinfo[0].dataValues);
  // console.log("이것은 카드해쉬태그입니다", cardHashtagsa[0].id);
  res.send(cardinfo);
  // cardHashtags의 카드아이디와 지금 카드아이디가 같을떄의 해쉬아이디를 해쉬태그 아이디와 비교

  // cardinfo.map((el) => {
  //   const payload = {
  //     id: el.id,
  //     title: el.title,
  //     cardtext: el.cardtext,
  //     background: el.background,
  //     completed: el.completed,
  //     users_id: el.users_id,
  //     createdAt: el.createdAt,
  //     updatedAt: el.updatedAt,
  //     // hashname: SearchHashNameId.hashname,
  //   };
  //   arr.push(payload);
  // });

  cardinfo.map((el) => {
    const payload = {
      el,
    };
  });
};

// 카드의 정보를 홈페이지에 접속하면 줌
// 해쉬태그 / 조인한 멤버아이디
// cardinfo_id 와 cardhashtags 의 card_id가 같을때 hashtags_id를
// hashtags 테이블에서 찾은다음 hashname을 전부 나열
