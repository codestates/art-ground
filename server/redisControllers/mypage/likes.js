const { exhibition, images, users, likes } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports = {
  getMyLikes: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    try {
      if (!userInfo) {
        res.status(401).json({ message: "invalid access token" });
      } else {
        const { id: user_id } = userInfo;
        // likes
        let likesData = await likes.findAll({
          attributes: ["exhibition_id"],
          where: {
            user_id,
          },
        });

        let exhibition_ids = likesData.map((el) => el.dataValues.exhibition_id);
        exhibition_ids = exhibition_ids.sort((a, b) => a - b);

        // exhibition
        const myExhibition = await exhibition.findAll({
          attributes: [
            "id",
            "author_id",
            "title",
            "start_date",
            "end_date",
            "status",
          ],
          where: {
            id: exhibition_ids,
          },
        });

        let author_ids = myExhibition.map((el) => el.dataValues.author_id);
        author_ids = author_ids.sort((a, b) => a - b);

        // author
        const authors = await users.findAll({
          attributes: ["id", "nickname", "user_email"],
          where: {
            id: author_ids,
          },
        });

        // images
        const myExhibitionImgs = await images.findAll({
          attributes: ["exhibition_id", "image_urls"],
          where: {
            exhibition_id: exhibition_ids,
          },
        });

        // exhibition x author
        for (let l = 0; l < myExhibition.length; l++) {
          for (let m = 0; m < authors.length; m++) {
            const myExhibitEl = myExhibition[l].dataValues;
            if (myExhibitEl.author_id === authors[m].dataValues.id) {
              const { user_email, nickname } = authors[m].dataValues;
              myExhibitEl.user_email = user_email;
              myExhibitEl.nickname = nickname;
            }
          }
        }
        // likes x exhibition
        for (let i = 0; i < likesData.length; i++) {
          let likesEl = likesData[i].dataValues;
          for (let j = 0; j < myExhibition.length; j++) {
            if (likesEl.exhibition_id === myExhibition[j].dataValues.id) {
              const {
                start_date,
                end_date,
                exhibit_desc,
                exhibit_type,
                genre_hashtags,
                status,
                title,
                user_email,
                nickname,
              } = myExhibition[j].dataValues;
              likesEl.start_date = start_date;
              likesEl.end_data = end_date;
              likesEl.exhibit_desc = exhibit_desc;
              likesEl.exhibit_type = exhibit_type;
              likesEl.genre_hashtags = genre_hashtags;
              likesEl.status = status;
              likesEl.title = title;
              likesEl.user_email = user_email;
              likesEl.nickname = nickname;
            }
          }
          // likes x images
          for (let k = 0; k < myExhibitionImgs.length; k++) {
            if (
              likesEl.exhibition_id ===
              myExhibitionImgs[k].dataValues.exhibition_id
            ) {
              likesEl.image_urls = myExhibitionImgs[k].dataValues.image_urls;
              break;
            } else {
              continue;
            }
          }
        }
        res.status(200).json({
          data: likesData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
