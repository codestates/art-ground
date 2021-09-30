const { exhibition, comments, images } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    try {
      if (userInfo.user_type === 3) {
        // comments 정보
        let data = await comments.findAll();
        let exhibition_ids = data.map((el) => el.dataValues.exhibition_id);
        exhibition_ids = exhibition_ids.sort((a, b) => a - b);
        exhibition_ids = [...new Set(exhibition_ids)];
        console.log("exhibition_ids", exhibition_ids);

        for (let i = 0; i < data.length; i++) {
          let exhibitionData = await exhibition.findAll({
            where: {
              id: exhibition_ids,
            },
          });

          let imgData = await images.findAll({
            where: {
              exhibition_id: exhibition_ids,
            },
          });

          // exhibition id
          for (let j = 0; j < exhibitionData.length; j++) {
            if (data[i].exhibition_id === exhibitionData[j].dataValues.id) {
              data[i].dataValues.exhibition_id =
                exhibitionData[j].dataValues.id;
              data[i].dataValues.title = exhibitionData[j].dataValues.title;
              data[i].dataValues.author_id =
                exhibitionData[j].dataValues.author_id;
              data[i].dataValues.start_date =
                exhibitionData[j].dataValues.start_date;
              data[i].dataValues.end_date =
                exhibitionData[j].dataValues.end_date;
              data[i].dataValues.status = exhibitionData[j].dataValues.status;
            }
          }
          // image
          for (let k = 0; k < imgData.length; k++) {
            if (
              data[i].dataValues.exhibition_id ===
              imgData[k].dataValues.exhibition_id
            ) {
              data[i].dataValues.image_urls = imgData[k].dataValues.image_urls;
            }
          }
        }
        res.status(200).json({ data: data });
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
          console.log("data:".data);
          if (!data) {
            res.status(404).json({
              message: "comment not exist",
            });
          } else {
            exhibition.destroy({
              where: {
                id: commentId,
              },
            });
          }
        })
        .then((result) => {
          console.log("result:", result);
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
