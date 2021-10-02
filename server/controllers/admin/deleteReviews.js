const { comments } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  deleteReviews: (req, res) => {
    const userInfo = isAuthorized(req);
    const { commentId } = req.params;
    console.log("userInfo:", userInfo, commentId);

    if (userInfo.user_type === 3) {
      comments
        .findOne({
          where: {
            id: commentId,
          },
        })
        .then((data) => {
          console.log("data:", data);
          if (!data) {
            res.status(404).json({
              message: "comment not exist",
            });
          } else {
            comments.destroy({
              where: {
                id: commentId,
              },
            });
          }
        })
        .then((result) => {
          res.status(200).json({
            message: "successfully delete comments",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
//
