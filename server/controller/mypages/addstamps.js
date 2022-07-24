const { userCardJoins } = require("../../models");
const { stampeds } = require("../../models");
module.exports = async (req, res) => {
  const userstampid = await userCardJoins
    .findAll({
      where: {
        cards_id: req.body.cards_id,
      },
    })
    .catch((err) => console.log(err));

  if (userstampid[0].stampeds_id === null) {
    const createStampid = await stampeds.create({}); // 새로만든 스탬프의 아이디

    var result = await userCardJoins.update(
      {
        stampeds_id: createStampid.id,
      },
      {
        where: {
          cards_id: req.body.cards_id,
        },
        returning: true, // update 반환값
        plain: true,
        // [x,y]첫 번째 요소 x는 항상 영향을 받는 행의 수이고 두 번째 요소 y는 실제 영향을 받는 행
      }
    );
    console.log(result);
  } else {
    console.log(result);
    res.status(409).send("이미 스탬프 된 카드입니다.");
  }

  // console.log(userstampid[0].stampeds_id);
  res.send(result);
};

// cards id가 들어왔을때
// 해당하는userCardjoins.cards_id를 찾고 stamped id 가  Null값이면 스템프아이디 생성 스템프 아이디 넣고
// id 순차적으로 넣어줌

//
