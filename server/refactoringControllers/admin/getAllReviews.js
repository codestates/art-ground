const { each, last, map, sortBy, isEqual } = require("underscore");
const {
  getSet,
  getList,
  getHashValue,
  getHash,
} = require("../../utils/redis/ctrl/getCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (userInfo.user_type === 3) {
      const allExhibitionId = await getSet("allExhibition");
      let data = [];
      each(allExhibitionId, async (exhibitionId) => {
        data.push(
          ...(await Promise.all(
            map(
              await getSet(`exhibition:comment:${exhibitionId}`),
              async (commentId) => {
                const commentData = await getHash(`comment:${commentId}`);
                commentData.exhibition = await getHashValue(
                  `exhibition:${commentData.exhibition_id}`,
                  "title"
                );
                commentData.user = await getHashValue(
                  `user:${commentData.user_id}`,
                  "id",
                  "nickname",
                  "profile_img"
                );
                return commentData;
              }
            )
          ))
        );

        if (isEqual(last(allExhibitionId), exhibitionId)) {
          res.status(200).json({
            data: sortBy(data, (el) => {
              return Math.min(el.id);
            }),
          });
        }
      });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
