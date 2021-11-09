const { redisClient } = require("./index");
const { exhibition } = require("../../models");

const setExhibitionCache = (exhibitionData) => {
  const {
    id,
    author_id,
    title,
    genre_hashtags,
    exhibit_desc,
    status,
    exhibit_type,
    start_date,
    end_date,
    createdAt,
    updatedAt,
  } = exhibitionData;

  redisClient.hset(
    `exhibition:${id}`,
    "id",
    id,
    "author_id",
    author_id,
    "title",
    title,
    "genre_hashtags",
    genre_hashtags,
    "exhibit_desc",
    exhibit_desc,
    "status",
    status,
    "exhibit_type",
    exhibit_type,
    "start_date",
    start_date,
    "end_date",
    end_date,
    "createdAt",
    createdAt,
    "updatedAt",
    updatedAt
  );
};

module.exports = {
  exhibitionCacheinitialization: async (...arg) => {
    if (arg.length === 0) {
      const exhibitionFindResult = await exhibition.findAll({
        raw: true,
        where: { status: 1 },
      });
      if (exhibitionFindResult) {
        exhibitionFindResult.forEach((el) => {
          setExhibitionCache(el);
        });
      }
    } else {
      const exhibitionId = arg[0];
      const exhibitionFindResult = await exhibition.findOne({
        raw: true,
        where: { status: 1, id: exhibitionId },
      });
      setExhibitionCache(exhibitionFindResult);
    }
  },
};
