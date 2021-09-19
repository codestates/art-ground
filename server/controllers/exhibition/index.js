const {
  exhibition: exhibitionModel,
  images: imagesModel,
} = require("../../models");

module.exports.getExhibition = async (req, res) => {
  const result = await exhibitionModel.findAll({ includes: imagesModel });
  const data = result.dataValues;

  res.sataus(200).json({ data });
};
