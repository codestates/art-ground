const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const images = sequelize.define(
    "images",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      exhibition_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "exhibition",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image_urls: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image_desc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      image_add_desc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "images",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "exhibition_id",
          using: "BTREE",
          fields: [{ name: "exhibition_id" }],
        },
      ],
    }
  );

  images.associate = function (models) {
    images.belongsTo(models.exhibition, {
      as: "exhibition",
      foreignKey: "exhibition_id",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return images;
};
