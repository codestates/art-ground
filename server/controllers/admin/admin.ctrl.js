const { exhibition } = require("../../models");
const { comments } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  approveExhibitions: (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId } = req.body;
    console.log("userInfo:", userInfo, postId);

    if (userInfo.user_type === 3) {
      exhibition
        .findOne({
          where: {
            id: postId,
          },
        })
        .then((data) => {
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "exhibition not exist",
            });
          } else {
            exhibition.update(
              {
                status: 1, // 전시 승인
              },
              {
                where: {
                  id: postId,
                },
              }
            );
          }
        })
        .then((result) => {
          console.log("result:", result);
          res.status(200).json({
            message: "exhibition successfully approved",
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
  closeExhibitions: (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId } = req.params;
    console.log("userInfo:", userInfo, postId);

    if (userInfo.user_type === 3) {
      exhibition
        .findOne({
          where: {
            id: postId,
          },
        })
        .then((data) => {
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "exhibition not exist",
            });
          } else {
            exhibition.update(
              {
                status: 2, // 전시 종료
              },
              {
                where: {
                  id: postId,
                },
              }
            );
          }
        })
        .then((result) => {
          console.log("result:", result);
          res.status(200).json({
            message: "successfully close exhibitions",
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
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "comment not exist",
            });
          } else {
            exhibition.destroy({
              where: {
                id: commentId,
              },
            });
          }
        })
        .then((result) => {
          console.log("result:", result);
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
