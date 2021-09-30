/**
 * SELECT exhibition_id
 * FROM likes
 * WHERE user_id = userInfo.id
 *
 *
 * SELECT *
 * FROM exhibition
 * WHERE id in ()
 *
 * users: author(user_email), nickname, author_id,
 * exhibition: start_date, end_date, exhibit_desc, exhibit_type, exhibit_id, genre_hashtags, status, title
 * images: img_urls,
 * likes: likes,
 */

const { likes, exhibition, images, users } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.getMyLikes = async (req, res) => {
  const userInfo = isAuthorized(req);

  const { id: user_id } = userInfo;

  // likes
  const result = await likes.findAll({
    attributes: ["exhibition_id"],
    where: {
      user_id,
    },
  });

  const exhibition_ids = result.map((el) => el.dataValues.exhibition_id);

  // exhibition
  const myExhibition = await exhibition.findAll({
    where: {
      id: exhibition_ids,
    },
  });

  const author_ids = myExhibition.map((el) => el.dataValues.author_id);

  // author
  let authors = await users.findAll({
    where: {
      id: author_ids,
    },
  });

  const authorData = [];
  for (let i = 0; i < authors.length; i++) {
    let el = {};
    el.id = authors[i].id;
    el.user_email = authors[i].user_email;
    el.nickname = authors[i].nickname;
    authorData.push(el);
  }

  // images
  const myExhibitionImgs = await images.findAll({
    where: {
      exhibition_id: exhibition_ids,
    },
  });

  const imgData = myExhibitionImgs.map((el) => el.dataValues.image_urls);
  res.status(200).json({
    imgData: imgData,
    exhibitionData: myExhibition,
    authorData: authorData,
  });
};
