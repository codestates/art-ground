const { exhibition } = require("../../models");

const { getHash } = require("../../utils/redis/ctrl/getCache.ctrl");
const {
  setHash,
  removeFromSet,
} = require("../../utils/redis/ctrl/setCache.ctrl");

const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  closeExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { postId, type } = req.params;
    const id = parseInt(postId);
    const exhibitionKey = `exhibition:${id}`;
    const exhibitionType = type === 1 ? "standard" : "premium";

    if (userInfo.user_type === 3) {
      const exhibitionResult = await getHash(exhibitionKey);
      if (exhibitionResult) {
        await setHash(exhibitionKey, "status", 2);
        await removeFromSet(exhibitionType, id);
        await addToSet("closedExhibition", id);
      }
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
//
