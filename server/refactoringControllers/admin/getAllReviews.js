const { each, last, map, sortBy } = require("underscore");
const {
  getSet,
  getList,
  getHashValue,
} = require("../../utils/redis/ctrl/getCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);

    //if (userInfo.user_type === 3) {
    //nickname, title필요;
    const allExhibitionId = await getSet("allExhibition");

    let data = [];
    each(allExhibitionId, async (exhibitionId) => {
      const commentr = await getList(`comment:${exhibitionId}`, 0, -1);
      data.push(
        ...(await Promise.all(
          map(commentr, async (commentData) => {
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
          })
        ))
      );
      if (last(allExhibitionId) === exhibitionId) {
        res.status(200).json({
          data: sortBy(data, (el) => {
            return Math.min(el.id);
          }),
        });
      }
    });
    // } else {
    //   res.status(401).json({
    //     message: "invalid access token",
    //   });
    // }
  },
};
