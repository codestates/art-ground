const { exhibition: exhibitionModel, images } = require("../../models");

module.exports.getExhibition = async (req, res) => {
  const result = await exhibitionModel.findAll({
    include: [
      {
        model: images,
        as: "images",
      },
    ],
  });
  const data = result.map((el) => el.dataValues);
  res.status(200).json({ data });
};
