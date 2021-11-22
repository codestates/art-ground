const { map } = require("underscore");
const {
  getSet,
  getHashValue,
  getList,
  getHash,
} = require("../../utils/redis/ctrl/getCache.ctrl");

module.exports.getDetailReview = async (req, res) => {
  const { postId: exhibition_id } = req.params;

  const commentsData = await Promise.all(
    map(
      await getSet(`exhibition:comment:${exhibition_id}`),
      async (commentId) => {
        const commentData = await getHash(`comment:${commentId}`);
        const userData = await getHashValue(
          `user:${commentData.user_id}`,
          "id",
          "nickname",
          "profile_img"
        );
        commentData.user = userData;
        return commentData;
      }
    )
  );

  const exhibitionData = await getHashValue(
    `exhibition:${exhibition_id}`,
    "id",
    "author_id",
    "title",
    "start_date",
    "end_date",
    "genre_hashtags",
    "status",
    "exhibit_type"
  );

  exhibitionData.author = await getHashValue(
    `user:${exhibitionData.author_id}`,
    "nickname"
  );

  const thumbnail = map(
    await getList(`images:${exhibition_id}`, 0, 0),
    (el) => {
      return { image_urls: el.image_urls };
    }
  );
  res.status(200).json({ commentsData, exhibitionData, thumbnail });
};
