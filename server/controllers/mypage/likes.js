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

const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModel,
  likes: likeModel,
} = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.getMyLikes = async (req, res) => {
  const userInfo = isAuthorized(req);
  console.log("userInfo:", userInfo);
  try {
    if (!userInfo) {
      res.status(401).json({ message: "invalid access token" });
    } else {
      const { id: user_id } = userInfo;
      // likes
      let likesData = await likeModel.findAll({
        // exhibition
        include: [
          {
            attributes: [
              "id",
              "author_id",
              "start_date",
              "end_date",
              "exhibit_desc",
              "exhibit_type",
              "genre_hashtags",
              "status",
              "title",
            ],
            model: exhibitionModel,
            as: "exhibition",
          },
          // images
          {
            attributes: ["image_urls"],
            model: imagesModel,
            as: "image_urls",
          },
          // users
          {
            attributes: ["user_email", "nickname"],
            model: userModel,
            as: "author",
          },
        ],
        where: {
          user_id,
        },
      });
      likesData = likesData.map((el) => el.dataValues);
      res.status(200).json({
        data: likesData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// let author_ids = myExhibition.map((el) => el.dataValues.author_id);
// author_ids = author_ids.sort((a, b) => a - b);

// // author
// const authors = [];
// for (let h = 0; h < author_ids.length; h++) {
//   const userData = await users.findOne({
//     where: {
//       id: author_ids[h],
//     },
//   });
//   authors.push(userData);
// }

// // images
// const myExhibitionImgs = await images.findAll({
//   where: {
//     exhibition_id: exhibition_ids,
//   },
// });

// // exhibition x users
// for (let l = 0; l < myExhibition.length; l++) {
//   for (let m = 0; m < authors.length; m++) {
//     const myExhibitEl = myExhibition[l].dataValues;
//     if (myExhibitEl.author_id === authors[m].dataValues.id) {
//       const { user_email, nickname } = authors[m].dataValues;
//       myExhibitEl.user_email = user_email;
//       myExhibitEl.nickname = nickname;
//     }
//   }
// }
// // likes x exhibition
// for (let i = 0; i < likesData.length; i++) {
//   let likesEl = likesData[i].dataValues;

//   for (let j = 0; j < myExhibition.length; j++) {
//     if (likesEl.exhibition_id === myExhibition[j].dataValues.id) {
//       const {
//         start_date,
//         end_date,
//         exhibit_desc,
//         exhibit_type,
//         genre_hashtags,
//         status,
//         title,
//         user_email,
//         nickname,
//       } = myExhibition[j].dataValues;
//       likesEl.start_date = start_date;
//       likesEl.end_data = end_date;
//       likesEl.exhibit_desc = exhibit_desc;
//       likesEl.exhibit_type = exhibit_type;
//       likesEl.genre_hashtags = genre_hashtags;
//       likesEl.status = status;
//       likesEl.title = title;
//       likesEl.user_email = user_email;
//       likesEl.nickname = nickname;
//     }
//   }
//   // likes x images
//   for (let k = 0; k < myExhibitionImgs.length; k++) {
//     if (
//       likesEl.exhibit_id === myExhibitionImgs[k].dataValues.exhibit_id
//     ) {
//       likesEl.image_urls = myExhibitionImgs[k].dataValues.image_urls;
//     }
//   }
// }
// let exhibition_ids = likesData.map((el) => el.dataValues.exhibition_id);
// exhibition_ids = exhibition_ids.sort((a, b) => a - b);

// // exhibition
// const myExhibition = await exhibition.findAll({
//   where: {
//     id: exhibition_ids,
//   },
// });
