const { map } = require("underscore");
const {
  getSet,
  isInSet,
  getHash,
  getHashValue,
  getList,
} = require("../../utils/redis/ctrl/getCache.ctrl");

module.exports.getExhibitionReview = async (req, res) => {
  const data = await Promise.all(
    map(await getSet("allExhibition"), async (exhibitionId) => {
      const checkExhibitionId = isInSet(exhibitionId);
      if (
        (await checkExhibitionId("standard")) ||
        (await checkExhibitionId("premium")) ||
        (await checkExhibitionId("closedExhibition"))
      ) {
        const exhibitionData = await getHash(`exhibition:${exhibitionId}`);
        return {
          ...exhibitionData,
          comments: await Promise.all(
            map(
              await getSet(`exhibition:comment:${exhibitionId}`),
              async (commentId) => {
                return await getHash(`comment:${commentId}`);
              }
            )
          ),
          images: await getList(`images:${exhibitionId}`, 0, 0),
          author: await getHashValue(
            `user:${exhibitionData.author_id}`,
            "nickname",
            "profile_img",
            "author_desc"
          ),
        };
      }
    })
  );
  res.status(200).json({ data });
};
