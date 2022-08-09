const { cards } = require("../../models");
const { hashtags } = require("../../models/");
const { cardHashtags } = require("../../models/");
module.exports = async (req, res) => {
  // userCardJoin table에 작성자 카드가 들어감 /

  //Client 에서 users_id 에 users의id를 넣어줘야함
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
  //!   // 클라이언트에서 받은 해쉬네임이 해쉬테그에 있는지 확인하고
  const oldHashtag = hashtags.findOne({
    where: {
      hashname: newCard.hashname,
    },
  });

  //!   // 없다면 생성
  if (oldHashtag === null) {
    await hashtags.create({
      hashname: req.body.hashname,
    });
    const newhashtagId = await hashtags.findOne({
      where: {
        hashname: req.body.hashname,
      },
    }); // 생성한 해쉬태그의 아이디를 찾는다
    await cardHashtags.create({
      card_id: createCard.id,
      hashtag_id: newhashtagId.id,
    });
    res.send({ data: { newhashtagId } });
    // cardHashtags 의 N번째 인덱스에 card_id(태그를 작성한 카드의 아이디) 와 hashtag_id(생성된 태그의 아이디)생성
  } else {
    //!   // 있다면
    const newhashtagId = await hashtags.findOne({
      where: {
        hashname: req.body.hashname,
      }, // 해쉬네임에 해당하는 해쉬태그 아이디를 구한다음
    });
    await cardHashtags.create({
      card_id: req.body.id, //카드 아이디와
      hashtag_id: newhashtagId, // 해쉬태그 아이디를 생성
    });
    res.send({ 뉴해쉬아이디: { newhashtagId } });
  }
  // res.send(console.log(oldHashtag));
  console.log({ 올드해쉬태그: { oldHashtag } });
  console.log({ 크리에잇카드: { createCard } });
  console.log("카드 생성 성공");
  // res.send({ data: { createCard } });
};
// 카드의 정보를 홈페이지에 접속하면 줌

//접속한 유저 아이디를 받아와야한다.
//req.body 내용을 카드에 추가
//태그를 받아와서 해쉬테이블에 같은네임이 있으면 그 아이디를 해쉬카드테이블에 추가하고 작성한 카드의 아이디도 해쉬카드 테이블에 추가한다.
//태그를 받아와서 해쉬테이블의 해쉬네임이 없다면 생성하고 그아이디를 해쉬카드테이블에 추가하고 작성한 카드의 아이디도 해쉬카드 테이블에 추가한다.
//태그가 비어있다면 스킵
