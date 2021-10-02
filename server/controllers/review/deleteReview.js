const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports = {
  deleteReview: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { commentsId: id } = req.params;
    if (userInfo) {
      const { id: user_id } = userInfo;
      const result = await commentsModel.destroy({
        where: {
          id,
          user_id,
        },
      });
      if (result) {
        res.status(201).json({
          message: "successfully delete comments",
        });
      } else {
        res.status(401).json({
          message: "invalid user",
        });
      }
    } else {
      res.status(401).json({
        message: "invalid user",
      });
    }
  },
};
