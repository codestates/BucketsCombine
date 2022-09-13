const {
  cards,
  cardHashtags,
  hashtags,
  userCardJoins,
} = require("../../models");

const addtegs = (C, CH, H, UCJ) => {
  let result = [];
  for (let card of C) {
    const matchedCH = CH.filter((el) => el.cards_id === card.id);

    let matchedHashtags = [];

    for (let i of matchedCH) {
      const [matchedHashtag] = H.filter((el) => el.id === i.hashtags_id);
      matchedHashtags.push(matchedHashtag.hashname);
    }

    const matchedUJ = UCJ.filter((el) => el.cards_id === card.id);

    const stamped = matchedUJ.map((el) => el.stampeds_id);
    const set = new Set(stamped);
    const stampedset = [...set];

    const matchedUsers = matchedUJ.map((el) => el.users_id);

    result.push({
      id: card.id,
      title: card.title,
      cardtext: card.cardtext,
      background: card.background,
      completed: card.completed,
      users_id: card.users_id,
      tag: matchedHashtags,
      membersID: matchedUsers,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
      stamped: stampedset,
    });
  }
  return result;
};

module.exports = async (req, res) => {
  const userCardJoinsinfo = await userCardJoins
    .findAll({})
    .catch((err) => console.log(err));
  const cardHashtagsinfo = await cardHashtags
    .findAll({})
    .catch((err) => console.log(err));
  const hashtagsinfo = await hashtags
    .findAll({})
    .catch((err) => console.log(err));
  const cardinfo = await cards
    .findAll({})
    .then((el) =>
      addtegs(el, cardHashtagsinfo, hashtagsinfo, userCardJoinsinfo)
    )
    .catch((err) => console.log(err));

  res.send(cardinfo);
};
