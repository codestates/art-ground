const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports = {
  postReview: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { postId: exhibition_id, comments } = req.body;
    if (userInfo) {
      const { id: user_id } = userInfo;
      const result = commentsModel.create({
        user_id,
        exhibition_id,
        comments,
      });
      if (result) {
        res.status(201).json({
          message: "successfully add comments",
        });
      }
    } else {
      res.status(401).json({
        message: "invalid user",
      });
    }
  },
};
