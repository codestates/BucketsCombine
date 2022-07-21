const { userCardJoins } = require("../../models");
const { stampeds } = require("../../models");
module.exports = async (req, res) => {
  const userstampid = await userCardJoins.findAll({
    where: {
      cards_id: req.body.cards_id,
    },
  });
  // if (userstampid[0].stampeds_id === null) {
  //   const createStampid = await stampeds.create({}); // 새로만든 스탬프의 아이디

  //   await userCardJoins.findOrCreate({
  //     where: {
  //       cards_id: req.body.cards_id,
  //     },
  //   });
  // }

  // console.log(userstampid[0].stampeds_id);
  res.send(userstampid);
};

// cards id가 들어왔을때
// 해당하는userCardjoins.cards_id를 찾고 stamped id 가  Null값이면 스템프아이디 생성 스템프 아이디 넣고
// id 순차적으로 넣어줌

//
