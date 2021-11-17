const { comments, exhibition, images, users } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
const {} = require("../../utils/redis/ctrl/getCache.ctrl");
module.exports = {
  deleteReviews: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { postId, commentId } = req.params;
    const exhibition_id = parseInt(postId);
    const id = parseInt(commentId);

    //comment:exhibition_id 받아온다.
    if (userInfo.user_type === 3) {
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
