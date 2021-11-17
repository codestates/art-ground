const { each, last, isEqual, map, mapObject, result } = require("underscore");
const { exhibition, comments, users } = require("../../models");
const { addAttr } = require("../../utils/customFunction");
const {
  getSet,
  getHash,
  getList,
  getHashValue,
} = require("../../utils/redis/ctrl/getCache.ctrl");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  getAllReviews: async (req, res) => {
    const userInfo = isAuthorized(req);
    const data = [];
    //if (userInfo.user_type === 3) {
    //nickname, title필요
    const allExhibitionId = await getSet("allExhibition");
    const commentr = await getList(`comment:59`, 0, -1);
    const reuslt = map(commentr, async (commentData) => {
      await Promise.all([
        getHashValue(`exhibition:91`, "title"),
        getHashValue(`user:${commentData.user_id}`, "nickname"),
      ]).then((el) => {
        arr = el;
        console.log(el);
        // commentData.title = el[0];
        // commentData.nickname = el[1];
        return arr;
      });

      // if (title && nickname) {
      //   console.log("haha");
      //   return commentData;
      // }
    });
    console.log(reuslt);

    each(allExhibitionId, async (exhibitionId) => {
      data.push(...[]);
      if (isEqual(last(allExhibitionId), exhibitionId)) {
        res.status(200).json({ data });
      }
    });
    // } else {
    //   res.status(401).json({
    //     message: "invalid access token",
    //   });
    // }
  },
};
//
