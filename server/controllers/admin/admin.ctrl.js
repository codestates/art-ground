const {
  exhibition,
  comments,
  images,
  users: userModel,
} = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    try {
      if (userInfo.user_type === 3) {
        // comments x users
        let commentsData = await comments.findAll({
          include: [
            {
              attributes: ["id", "user_email", "nickname"],
              model: userModel,
              as: "user",
            },
          ],
        });

        let exhibition_ids = commentsData.map(
          (el) => el.dataValues.exhibition_id
        );
        exhibition_ids = exhibition_ids.sort((a, b) => a - b);
        exhibition_ids = [...new Set(exhibition_ids)];
        // console.log("exhibition_ids", exhibition_ids);

        // exhibition
        let exhibitionData = await exhibition.findAll({
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

        let author_ids = exhibitionData.map((el) => el.dataValues.author_id);
        author_ids = author_ids.sort((a, b) => a - b);
        author_ids = [...new Set(author_ids)];
        // console.log("author_ids", author_ids);

        // author
        const authorData = await userModel.findAll({
          attributes: ["id", "nickname"],
          where: {
            id: author_ids,
          },
        });

        // image
        const imgData = await images.findAll({
          attributes: ["exhibition_id", "image_urls"],
          where: {
            exhibition_id: exhibition_ids,
          },
        });

        // exhibition x authors
        for (let g = 0; g < exhibitionData.length; g++) {
          for (let h = 0; h < authorData.length; h++) {
            const exhibitEl = exhibitionData[g].dataValues;
            if (exhibitEl.author_id === authorData[h].dataValues.id) {
              exhibitEl.author_name = authorData[h].dataValues.nickname;
            }
          }
        }
        // comments x exhibition
        for (let i = 0; i < commentsData.length; i++) {
          for (let j = 0; j < exhibitionData.length; j++) {
            const commentsEl = commentsData[i].dataValues;
            if (commentsEl.exhibition_id === exhibitionData[j].dataValues.id) {
              const {
                title,
                author_id,
                start_date,
                end_date,
                status,
                author_name,
              } = exhibitionData[j].dataValues;
              commentsEl.title = title;
              commentsEl.author_id = author_id;
              commentsEl.start_date = start_date;
              commentsEl.end_date = end_date;
              commentsEl.status = status;
              commentsEl.author_name = author_name;
            }
          }
          // comments x image
          for (let k = 0; k < imgData.length; k++) {
            const commentsEl = commentsData[i].dataValues;
            if (
              commentsEl.exhibition_id === imgData[k].dataValues.exhibition_id
            ) {
              commentsEl.image_urls = imgData[k].dataValues.image_urls;
              break;
            } else {
              continue;
            }
          }
        }
        commentsData = commentsData.map((el) => el.dataValues);
        console.log("data------", commentsData[2]);
        res.status(200).json({ data: commentsData });
      } else {
        res.status(401).json({
          message: "invalid access token",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  approveExhibitions: (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId } = req.body;

    console.log("+++++++++++++++", req.headers);
    console.log("userInfo:", userInfo, postId);

    if (userInfo.user_type === 3) {
      exhibition
        .findOne({
          where: {
            id: postId,
          },
        })
        .then((data) => {
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "exhibition not exist",
            });
          } else {
            exhibition.update(
              {
                status: 1, // 전시 승인
              },
              {
                where: {
                  id: postId,
                },
              }
            );
          }
        })
        .then((result) => {
          console.log("result:", result);
          res.status(200).json({
            message: "exhibition successfully approved",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
  closeExhibitions: (req, res) => {
    const userInfo = isAuthorized(req);
    const { postId } = req.params;
    console.log("userInfo:", userInfo, postId);

    if (userInfo.user_type === 3) {
      exhibition
        .findOne({
          where: {
            id: postId,
          },
        })
        .then((data) => {
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "exhibition not exist",
            });
          } else {
            exhibition.update(
              {
                status: 2, // 전시 종료
              },
              {
                where: {
                  id: postId,
                },
              }
            );
          }
        })
        .then((result) => {
          console.log("result:", result);
          res.status(200).json({
            message: "successfully close exhibitions",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
  deleteReviews: (req, res) => {
    const userInfo = isAuthorized(req);
    const { commentId } = req.params;
    console.log("userInfo:", userInfo, commentId);

    if (userInfo.user_type === 3) {
      comments
        .findOne({
          where: {
            id: commentId,
          },
        })
        .then((data) => {
          console.log("data:", data);
          if (!data) {
            res.status(404).json({
              message: "comment not exist",
            });
          } else {
            comments.destroy({
              where: {
                id: commentId,
              },
            });
          }
        })
        .then((result) => {
          res.status(200).json({
            message: "successfully delete comments",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
