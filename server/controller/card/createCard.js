const { cards } = require("../../models");
const { hashtags } = require("../../models/");
const { cardHashtags } = require("../../models/");
const { userCardJoins } = require("../../models/");
module.exports = async (req, res) => {
  const newCard = {
    title: req.body.title,
    cardtext: req.body.cardtext,
    users_id: req.body.users_id,
    hashname: req.body.hashname,
    background: req.body.background,
  };
  const createCard = await cards.create({
    title: newCard.title,
    cardtext: newCard.cardtext,
    users_id: newCard.users_id,
    background: newCard.background,
  });
  const createJoin = await userCardJoins.create({
    // 본인카드는 담기버튼이 안나와야됌
    cards_id: createCard.id,
    users_id: newCard.users_id,
  }); // userCardJoin table에 작성자 카드가 들어감 /
  console.log("만든카드아이디", createCard.id);
  if (!req.body.hashname.length) {
  } else {
    for (let i = 0; i < req.body.hashname.length; i++) {
      const checkHashName = await hashtags.findOne({
        where: {
          hashname: req.body.hashname[i],
        },
      });
      if (!checkHashName || Object.keys(checkHashName).length === 0) {
        await hashtags.create({
          hashname: req.body.hashname[i],
        });
        const newhashtagId = await hashtags.findOne({
          where: {
            hashname: req.body.hashname[i],
          },
        }); // 생성한 해쉬태그의 아이디를 찾는다
        console.log("만든해쉬네임아이디", newhashtagId.id);
        await cardHashtags.create({
          cards_id: createCard.id,
          hashtags_id: newhashtagId.id,
        }); // cardHashtags 의 N번째 인덱스에 card_id(태그를 작성한 카드의 아이디) 와 hashtag_id(생성된 태그의 아이디)생성
      } else {
        const newhashtagId = await hashtags.findOne({
          where: {
            hashname: req.body.hashname[i],
          }, // 해쉬네임에 해당하는 해쉬태그 아이디를 구한다음
        });
        await cardHashtags.create({
          cards_id: createCard.id, //카드 아이디와
          hashtags_id: newhashtagId.id, // 해쉬태그 아이디를 생성
        });
      }
    }
  }
  res.send("성공");
  console.log("카드 생성 성공");
};
// 카드의 정보를 홈페이지에 접속하면 줌

//접속한 유저 아이디를 받아와야한다.
//req.body 내용을 카드에 추가
//태그를 받아와서 해쉬테이블에 같은네임이 있으면 그 아이디를 해쉬카드테이블에 추가하고 작성한 카드의 아이디도 해쉬카드 테이블에 추가한다.
//태그를 받아와서 해쉬테이블의 해쉬네임이 없다면 생성하고 그아이디를 해쉬카드테이블에 추가하고 작성한 카드의 아이디도 해쉬카드 테이블에 추가한다.
//태그가 비어있다면 스킵

//! 카드 생성시 cards,hashtags,cardHashtags,userCardJoins 데이터생성
