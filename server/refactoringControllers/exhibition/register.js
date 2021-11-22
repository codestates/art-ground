const { isAuthorized } = require("../../utils/tokenFunction");
const {
  exhibition: exhibitionModels,
  images: imagesModel,
} = require("../../models");
const { each } = require("underscore");
const {
  setExhibitionCache,
  setImageCache,
} = require("../../utils/customFunction");

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
        await setExhibitionCache(result.dataValues);

        each(JSON.parse(images), async (el) => {
          const {
            title,
            img: image_urls,
            content: image_desc,
            subContent: image_add_desc,
          } = el;

          await setImageCache(
            (
              await imagesModel.create({
                exhibition_id: result.dataValues.id,
                title,
                image_urls,
                image_desc,
                image_add_desc,
              })
            ).dataValues
          );
        });

        res
          .status(201)
          .json({ message: "exhibition created", data: JSON.parse(images) });
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
