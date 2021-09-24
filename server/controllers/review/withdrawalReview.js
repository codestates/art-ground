const { comments: commentsModel } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.getReviewPage = async (req, res) => {
  const userInfo = isAuthorized(req);
  const { commentsId: id } = req.body;
  if (userInfo) {
    const { user_id } = userInfo;
    const result = commentsModel.destroy({
      where: {
        id,
      },
    });
    if (result) {
      res.status(201).json({
        message: "successfully delete comments",
      });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
