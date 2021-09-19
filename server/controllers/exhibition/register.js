const { isAuthorized } = require("../tokenFunction");
const {
  exhibition: exhibitionModels,
  images: imagesModel,
} = require("../../models");
const { isValid } = require("../../utils/validCheck");
module.exports.register = async (req, res) => {
  //const userInfo = isAuthorized(req);
  const userInfo = { id: 3 };
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
        images.forEach((el) => {
          const {
            title,
            imageUrl: image_urls,
            imageDesc: image_desc,
            imageAddDesc: image_add_desc,
          } = el;
          imagesModel.create({
            exhibition_id,
            title,
            image_urls,
            image_desc,
            image_add_desc,
          });
        });
        res.status(201).json({ message: "exhibition created" });
      }
    } else {
      res.status(422).json({ message: "insufficient parameters supplied" });
    }
  }
};
