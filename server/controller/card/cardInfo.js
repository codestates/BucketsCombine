const { cards } = require("../../models");
const { cardHashtags } = require("../../models");
const { hashtags } = require("../../models");
module.exports = async (req, res) => {
  const cardinfo = await cards.findAll({});
  const cardHashtagsinfo = await cardHashtags.findAll({});
  const hashtagsinfo = await hashtags.findAll({});
  const result = [];
  const objarr1 = [];
  const objarr2 = [];
  // console.log(cardinfo);
  // console.log("이것은 카드해쉬태그입니다", cardHashtagsa[0].id);
  // res.send(cardinfo);
  // cardHashtags의 카드아이디와 지금 카드아이디가 같을떄의 해쉬아이디를 해쉬태그 아이디와 비교
  //hash 태그를 다 뽑아서

  //  맵안에서 반복문을 사용해가지구 el.id -> card_id 니까
  //  el.id가 cardHashtags를 뽑아와서 foreach 문으로 cardHashtags card_id랑 같으면
  //  리턴으로 cardHashtags의 hashtags_id를 뽑고
  //  hashtags_id를 hashtags의iD가 같을때 foreach 을 사용해서 hashname을 배열안에 푸시

  cardinfo.map((el) => {
    // for (let i = 0; i < cardHashtagsinfo.length; i++) {
    //   if (el.id === cardHashtagsinfo[i].cards_id) {
    //     //1카드에 해당하는 카드해쉬테크 카드아이디가 같은경우
    //     objarr1.push(cardHashtagsinfo[i]); // objarr에는 카드id와 카드해쉬테크카드아이디가 같은 카드해쉬테그가 들어있다.
    //   }
    //   for (let j = 0; j < hashtagsinfo.length; j++) {
    //     for (let k = 0; k < objarr1.length; k++) {
    //       if (objarr1[k].hashtags_id === hashtagsinfo[j].id) {
    //         var hashnames = hashtagsinfo[j].hashname;
    //         for (let z = 0; z < objarr2.length; z++) {
    //           if (objarr2[z].hashname.indexOf(hashnames)) {
    //             objarr2[z].push(hashnames);
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // console.log("한번 거른 objarr1", objarr1);
    // console.log("경우의 수", objarr2);
    console.log("해쉬네임", objarr2);
    const payload = {
      id: el.id,
      title: el.title,
      cardtext: el.cardtext,
      background: el.background,
      completed: el.completed,
      users_id: el.users_id,
      createdAt: el.createdAt,
      updatedAt: el.updatedAt,
      // hashname: SearchHashNameId.hashname,
    };
    result.push(payload);
  });
  res.send(result);
};

// 카드의 정보를 홈페이지에 접속하면 줌
// 해쉬태그 / 조인한 멤버아이디
// cardinfo_id 와 cardhashtags 의 card_id가 같을때 hashtags_id를
// hashtags 테이블에서 찾은다음 hashname을 전부 나열
