const { exhibition, comments, users, images, likes } = require("../../models");

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
    //전체 전시 정보에서는 status 수정 하고
    //type 별 전시 정보에는 삭제해야한다.

    //Hash로 되어있는 exhibition:id 에서 status 수정.
    //type 별 set에서는 제거

    if (userInfo.user_type === 3) {
      const exhibitionResult = getHash(exhibitionKey);
      if (exhibitionResult) {
        setHash(exhibitionKey, "status", 2);
        removeFromSet(exhibitionType, id);
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
