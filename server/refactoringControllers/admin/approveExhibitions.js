const { exhibition } = require("../../models");

const { isAuthorized } = require("../../utils/tokenFunction");

const { isNull } = require("underscore");
const { setGrading } = require("../../utils/customFunction");
const { setHash } = require("../../utils/redis/ctrl/setCache.ctrl");

module.exports = {
  approveExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { id, exhibit_type } = req.body.data;

    if (userInfo.user_type === 3) {
      await setHash(`exhibition:${id}`, "status", "1");
      await setGrading(exhibit_type, id);
      res.status(200).json({
        message: "exhibition successfully approved",
      });

      if (
        isNull(
          await exhibition.findOne({
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
