const { cards } = require("../../models");
const { cardHashtags } = require("../../models/");
const { hashtags } = require("../../models/");

module.exports = async (req, res) => {
  const cardsinfo = await cards
    .update(
      {
        title: req.body.title,
        cardtext: req.body.cardtext,
        background: req.body.background, // 사진
        hashname: req.body.hashname,
        completed: req.body.completed,
      },
      { where: { id: req.body.cards_id } }
    )
    .then((data) => {
      res.send("수정되었습니다");
    })
    .catch((err) => {
      console.error(err);
    });
  await cardHashtags.destroy({
    where: { cards_id: req.body.cards_id },
  });
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
        await cardHashtags.create({
          cards_id: cardsinfo.cards_id,
          hashtags_id: newhashtagId.id,
        }); // cardHashtags 의 N번째 인덱스에 card_id(태그를 작성한 카드의 아이디) 와 hashtag_id(생성된 태그의 아이디)생성
      } else {
        const newhashtagId = await hashtags.findOne({
          where: {
            hashname: req.body.hashname[i],
          },
        }); // 생성한 해쉬태그의 아이디를 찾는다
        await cardHashtags.create({
          cards_id: req.body.cards_id,
          hashtags_id: newhashtagId.id,
        });
      }
    }
  }
  res.send(cardsinfo);
};
