const { isAuthorized } = require("../../utils/tokenFunction");
const {
  exhibition: exhibitionModels,
  images: imagesModel,
} = require("../../models");
const { redisClient } = require("../../utils/redis");

module.exports.register = async (req, res) => {
  const userInfo = isAuthorized(req);

  if (userInfo) {
    const { id: author_id } = userInfo;
    const {
      title,
      genreHashtags: genre_hashtags,
      exhibitInfo: exhibit_desc,
      exhibitType: exhibit_type,
      startDate: start_date,
      endDate: end_date,
      images,
    } = req.body;

    if (
      title &&
      genre_hashtags &&
      exhibit_desc &&
      exhibit_type &&
      start_date &&
      end_date
    ) {
      const result = await exhibitionModels.create({
        author_id,
        title,
        genre_hashtags,
        exhibit_desc,
        status: 0,
        exhibit_type,
        start_date,
        end_date,
      });

      if (result) {
        const exhibition_id = result.dataValues.id;
        const parsingImages = JSON.parse(images);
        parsingImages.forEach(async (el) => {
          const {
            title,
            img: image_urls,
            content: image_desc,
            subContent: image_add_desc,
          } = el;

          await imagesModel.create({
            exhibition_id,
            title,
            image_urls,
            image_desc,
            image_add_desc,
          });
        });
        redisClient.flushall();
        res
          .status(201)
          .json({ message: "exhibition created", data: JSON.parse(images) });
      } else {
      }
    } else {
      res.status(422).json({ message: "insufficient parameters supplied" });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
