const { hashtags } = require("../../models/");
module.exports = async (req, res) => {
  const hashtagsinfo = await hashtags.findAll({});
  res.send(hashtagsinfo);
};
