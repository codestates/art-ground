const { map } = require("underscore");
const {
  getSet,
  getHash,
  getHashValue,
  getList,
} = require("../../utils/redis/ctrl/getCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports = {
  getMyLikes: async (req, res) => {
    const userInfo = isAuthorized(req);
    try {
      if (!userInfo) {
        res.status(401).json({ message: "invalid access token" });
      } else {
        const userInfo = { id: 95 };
        const { id: user_id } = userInfo;

        const userLikesData = await getSet(`user:like:${user_id}`);

        const data = await Promise.all(
          map(userLikesData, async (exhibitionId) => {
            const {
              end_date: end_data,
              id: exhibition_id,
              title,
              start_date,
              status,
              author_id,
            } = await getHash(`exhibition:${exhibitionId}`);
            const { user_email, nickname } = await getHashValue(
              `user:${author_id}`,
              "user_email",
              "nickname"
            );
            const { image_urls } = (
              await getList(`images:${exhibitionId}`, 0, 0)
            )[0];

            return {
              end_data,
              exhibition_id,
              title,
              start_date,
              status,
              user_email,
              nickname,
              image_urls,
            };
          })
        );

        res.status(200).json({
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
