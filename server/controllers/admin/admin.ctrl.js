const { exhibition, comments, images } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  // exhibition: title, author_id(users.id), start_date, end_date
  // images: image_urls(exhibition_id:exhibition.id)
  /*{
    comments: "쿠키 삭제 테스트중"
    createdAt: "2021-09-27T07:57:13.000Z"
    exhibition_id: 33
    id: 56
    updatedAt: "2021-09-27T07:57:13.000Z"
    user_id: 29,
    author_id: 26
    end_date: "2021-12-31"
    image_urls: "https://pickmeupimagestorage.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A1%E1%86%A8%E1%84%8C%E1%85%B5%E1%84%8B%E1%85%A7%E1%86%BC1-1.jpeg"
    start_date: "2021-09-27"
    title: "박지영 정물화 개인전"
  }*/
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);
    console.log("userInfo:", userInfo);
    try {
      if (userInfo.user_type === 3) {
        // comments 정보
        let data = await comments.findAll();
        console.log("data:", data);
        let exhibition_ids = data.map((el) => el.dataValues.exhibition_id);
        exhibition_ids = [...new Set(exhibition_ids)];
        // 중복되는 id 제거
        for (let i = 0; i < data.length; i++) {
          // let data = {};
          let exhibitionData = await exhibition.findByPk(exhibition_ids);
          let imgData = await images.findByPk(exhibition_ids);
          // exhibition id
          for (let j = 0; j < exhibitionData.length; j++) {
            if (data[i].exhibition_id === exhibitionData[j].id) {
              data[i].exhibition_id = exhibitionData[j].id;
              data[i].title = exhibitionData[j].title;
              data[i].author_id = exhibitionData[j].author_id;
              data[i].start_date = exhibitionData[j].start_date;
              data[i].end_date = exhibitionData[j].end_date;
            }
          }
          // image
          for (let k = 0; k < imgData.length; k++) {
            if (data[i].exhibition_id === imgData[k].exhibition_id) {
              data[i].image_urls = imgData[k].image_urls;
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
  // getExhibitionInfo: async (req, res) => {
  //   const userInfo = isAuthorized(req);
  //   console.log("userInfo:", userInfo);

  //   const test = await exhibition.findByPk(32);
  //   console.log("test:", test);
  //   /*
  //     1. params로 json.stringify한 exhibition pk들 받아서 json.parse
  //     2. 파싱 시킨 json에서 받은 pk에 해당하는 exhibition title, author_id(users.id), start_date, end_date 찾아서 data 변수에 담아두기
  //     3. 파싱 시킨 json에서 받은 pk에 해당하는 images.image_urls 찾아서 data 변수에 합치고 return
  //   */
  //   try {
  //     if (userInfo.user_type === 3) {
  //       const { exhibitionPk } = req.query;
  //       const parsedData = JSON.parse(exhibitionPk);
  //       let dataArr = [];
  //       for (let i = 0; i < parsedData.length; i++) {
  //         let data = {};
  //         let findData = await exhibition.findByPk(parsedData[i]);
  //         data.id = parsedData[i];
  //         data.title = findData.title;
  //         data.author_id = findData.author_id;
  //         data.start_date = findData.start_date;
  //         data.end_date = findData.end_date;

  //         let findImg = await images.findOne({
  //           where: {
  //             exhibition_id: parsedData[i],
  //           },
  //         });
  //         data.image_urls = findImg.image_urls;
  //         dataArr.push(data);
  //       }
  //       res.status(200).json({ data: dataArr, message: "ok" });
  //     } else {
  //       res.status(401).json({
  //         message: "invalid access token",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
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
