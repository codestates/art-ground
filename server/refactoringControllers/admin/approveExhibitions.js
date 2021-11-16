const { exhibition, comments, users, images, likes } = require("../../models");

const { isAuthorized } = require("../../utils/tokenFunction");
const { findOne, update } = require("../../utils/dbFunction");
const { isNull } = require("underscore");
module.exports = {
  approveExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { id, exhibit_type } = req.body.data;
    const redisKey = `exhibition:${id}`;

    if (userInfo.user_type === 3) {
      res.status(200).json({
        message: "exhibition successfully approved",
      });

      if (
        isNull(
          await findOne(exhibition, {
            where: {
              id,
            },
          })
        )
      ) {
        res.status(404).json({
          message: "exhibition not exist",
        });
      } else {
        await update(
          exhibition,
          {
            status: 1, // 전시 승인
          },
          {
            where: {
              id,
            },
          }
        );
      }
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
//
