const { cards } = require("../../models");
const { userCardJoins } = require("../../models");
const { cardHashtags } = require("../../models");
const { hashtags } = require("../../models");
const { stampeds } = require("../../models");
module.exports = async (req, res) => {
  const data = await stampeds.findOne({
    include: [
      {
        model: userCardJoins,
        where: {
          cards_id: req.body.cards_id,
        },
      },
    ],
  });
  await userCardJoins.destroy({
    where: {
      cards_id: req.body.cards_id,
    },
  });
  if (!data || Object.keys(data).length === 0) {
  } else {
    await stampeds.destroy({
      where: {
        id: data.dataValues.id,
      },
    });
  }
  await cardHashtags.destroy({
    where: {
      cards_id: req.body.cards_id,
    },
  });
  await cards.destroy({
    where: {
      id: req.body.cards_id,
    },
  });
  res.send("카드가 삭제되었습니다.");
};
// stamped id / hashtags

// const mycards = await cards.findAll({
//   // where { id : iserCardjoins.cards_id }
//   include: [
//     {
//       model: userCardJoins,
//       where: {
//         users_id: usersId.id, //! usersId.id 로 수정해야됌
//       },
//       include: [
//         {
//           model: users,
//         },
//       ],
//     },
//   ],
// });
