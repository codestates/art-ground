const { comments } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {
  removeHash,
  removeFromSet,
} = require("../../utils/redis/ctrl/setCache.ctrl");
module.exports = {
  deleteReviews: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId, commentId } = req.params;
    const id = parseInt(commentId);

    //comment:exhibition_id 받아온다.
    if (userInfo.user_type === 3) {
      await removeFromSet("allComments", id);
      await removeFromSet(`exhibition:comment:${postId}`, id);
      await removeHash(`comment:${id}`);
      res.status(200).json({
        message: "successfully delete comments",
      });

      await comments.destroy({
        where: {
          id,
        },
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
//
