const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  incrId,
  addToSet,
  setHash,
} = require("../../utils/redis/ctrl/setCache.ctrl");
const { each, keys } = require("underscore");
module.exports.postReview = async (req, res) => {
  const userInfo = isAuthorized(req);

  const { postId: exhibition_id, comments } = req.body;

  if (userInfo) {
    const { id: user_id } = userInfo;
    const id = await incrId("lastCommentId");
    const newComment = {
      id,
      exhibition_id,
      user_id,
      comments,
      createdAt: new Date(),
    };
    await addToSet(`exhibition:comment:${exhibition_id}`, id);
    await addToSet(`allExhibitionComment`, id);
    each(keys(newComment), async (key) => {
      await setHash(`comment:${id}`, key, newComment[key]);
    });
    await commentsModel.create(newComment);
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
