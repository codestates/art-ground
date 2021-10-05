const { exhibition } = require("../../models");
const { isAuthorized } = require("../../utils/tokenFunction");

module.exports = {
  approveExhibitions: async (req, res) => {
    const userInfo = isAuthorized(req);

    const { id, exhibit_type } = req.body.data;
    const redisKey =
      exhibit_type === undefined
        ? "allExhibition"
        : exhibit_type === 1
        ? "standard"
        : "premium";

    if (userInfo.user_type === 3) {
      const allExhibitionResult = await axios.get(
        "https://art-ground.link/exhibition"
      );
      const typeExhibitionResult = await axios.get(
        `https://art-ground.link/exhibition/${exhibit_type}`
      );

      const allExhibitionReply = allExhibitionResult.data.data;
      const typeExhibitionReply = typeExhibitionResult.data.data;
      allExhibitionReply.some((el) => {
        if (el.id === id) {
          el.status = 1;
          return true;
        }
      });
      typeExhibitionReply.push({ ...req.body.data });
      caching("allExhibition", allExhibitionReply);
      caching(redisKey, typeExhibitionReply);
      res.status(200).json({
        message: "exhibition successfully approved",
      });
      const result = await exhibition.findOne({
        where: {
          id,
        },
      });

      if (!result) {
        res.status(404).json({
          message: "exhibition not exist",
        });
      } else {
        await exhibition.update(
          {
            status: 1, // 전시 승인
          },
          {
            where: {
              id,
            },
          }
        );
      }
    } else {
      res.status(401).json({
        message: "invalid access token",
      });
    }
  },
};
//
