const { exhibition } = require("../../models");

const { getHash } = require("../../utils/redis/ctrl/getCache.ctrl");
const {
  setHash,
  removeFromSet,
  addToSet,
} = require("../../utils/redis/ctrl/setCache.ctrl");

const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  closeExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId, type } = req.params;
    const id = parseInt(postId);
    const exhibitionType = type === "1" ? "standard" : "premium";

    if (userInfo.user_type === 3) {
      await setHash(`exhibition:${id}`, "status", 2);
      await removeFromSet(exhibitionType, id);
      await addToSet("closedExhibition", id);

      res.status(200).json({
        message: "successfully close exhibitions",
      });
      await exhibition.update(
        {
          status: 2, // 전시 종료
        },
        {
          where: {
            id,
          },
        }
      );
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
