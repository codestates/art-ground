const { map } = require("underscore");
const { getTotalExhibitionData } = require("../../utils/customFunction");
const { getSet } = require("../../utils/redis/ctrl/getCache.ctrl");

module.exports.getExhibition = async (req, res) => {
  const { type: exhibit_type } = req.params;
  const exhibitionRedisKey =
    exhibit_type === undefined
      ? "allExhibition"
      : exhibit_type === "1"
      ? "standard"
      : "premium";

  res.status(200).json({
    data: await Promise.all(
      map(await getSet(exhibitionRedisKey), async (exhibition_id) => {
        return await getTotalExhibitionData(exhibition_id);
      })
    ),
  });
};
