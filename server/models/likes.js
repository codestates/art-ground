const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const likes = sequelize.define(
    "likes",
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "likes",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "exhibition_id",
          using: "BTREE",
          fields: [{ name: "exhibition_id" }],
        },
      ],
    }
  );
  likes.associate = function (models) {
    likes.belongsTo(models.exhibition, {
      as: "exhibition",
      foreignKey: "exhibition_id",
      onDelete: "CASCADE",
      hooks: true,
    });
    likes.belongsTo(models.users, {
      as: "user",
      foreignKey: "user_id",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return likes;
};
