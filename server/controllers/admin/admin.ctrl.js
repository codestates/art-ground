const { exhibition } = require("../../models");
const { comments } = require("../../models");
const { images } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  // exhibition: title, author_id(users.id), start_date, end_date
  // images: image_urls(exhibition_id:exhibition.id)
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    try {
      if (userInfo.user_type === 3) {
        const data = await comments.findAll();
        console.log("data:", data);
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
  getExhibitionInfo: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);

    const test = await exhibition.findByPk(32);
    console.log("test:", test);
    /*
      1. params로 json.stringify한 exhibition pk들 받아서 json.parse
      2. 파싱 시킨 json에서 받은 pk에 해당하는 exhibition title, author_id(users.id), start_date, end_date 찾아서 data 변수에 담아두기
      3. 파싱 시킨 json에서 받은 pk에 해당하는 images.image_urls 찾아서 data 변수에 합치고 return
    */
    try {
      if (userInfo.user_type === 3) {
        const { exhibitionPk } = req.query;
        const parsedData = JSON.parse(exhibitionPk);
        let dataArr = [];
        for (let i = 0; i < parsedData.length; i++) {
          let data = {};
          let findData = await exhibition.findByPk(parsedData[i]);
          data.id = parsedData[i];
          data.title = findData.title;
          data.author_id = findData.author_id;
          data.start_date = findData.start_date;
          data.start_date = findData.end_date;

          let findImg = await images.findOne({
            where: {
              exhibition_id: parsedData[i],
            },
          });
          data.image_urls = findImg.image_urls;
          dataArr.push(data);
        }
        res.status(200).json({ data: dataArr, message: "ok" });
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
