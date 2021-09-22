const {
  exhibition: exhibitionModel,
  images: imagesModel,
  users: userModels,
} = require("../../models");

module.exports.getExhibition = async (req, res) => {
  const { type: exhibit_type } = req.params;
  const result = await exhibitionModel.findAll({
    include: [
      {
        model: imagesModel,
        as: "images",
      },
    ],
    where: {
      exhibit_type,
    },
  });
  const data = result.map((el) => el.dataValues);
  const authorDesc = await userModels.findOne;

  res.status(200).json({ data });
};
