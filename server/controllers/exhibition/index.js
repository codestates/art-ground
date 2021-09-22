const { exhibition: exhibitionModel, images } = require("../../models");

module.exports.getExhibition = async (req, res) => {
  const { type: exhibit_type } = req.params;
  const result = await exhibitionModel.findAll({
    include: [
      {
        model: images,
        as: "images",
      },
    ],
    where: {
      exhibit_type,
    },
  });
  const data = result.map((el) => el.dataValues);
  res.status(200).json({ data });
};
