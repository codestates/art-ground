const { getLikes } = require("../../utils/customFunction");

module.exports.getLikesCache = async (req, res) => {
  res.status(200).json({ likes: await getLikes(req.params.postId) });
};
