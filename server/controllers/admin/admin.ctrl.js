const { exhibition } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  approveExhibition: (req, res) => {
    const { postId } = req.body;
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo, postId);

    if (userInfo.user_type === 1 /*관리자는 원래 3*/) {
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
                status: 1,
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
};
