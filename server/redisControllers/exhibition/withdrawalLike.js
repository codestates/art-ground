const { likes } = require("../../models");
const { Op } = require("sequelize");
const { isAuthorized } = require("../../utils/tokenFunction");
module.exports.withdrawalLike = async (req, res) => {
  const userInfo = isAuthorized(req);
  if (userInfo) {
    const { postId: exhibition_id, type: exhibit_type } = req.params;
    const { id: user_id } = userInfo;

    /**
     * type 별로 getCaching
     * id = exhibition_id 인 데이터 찾아서
     *
     */
    const result = await likes.destroy({
      where: {
        [Op.and]: [{ exhibition_id }, { user_id }],
      },
    });

    if (result) {
      res.status(200).json({
        message: "successfully delete like",
      });
    }
  } else {
    res.status(401).json({
      message: "invalid user",
    });
  }
};
