const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const exhibition = sequelize.define(
    "exhibition",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      genre_hashtags: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      exhibit_desc: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      exhibit_type: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      end_date: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "exhibition",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "author_id",
          using: "BTREE",
          fields: [{ name: "author_id" }],
        },
      ],
    }
  );

  exhibition.associate = function (models) {
    exhibition.hasMany(models.comments, {
      as: "comments",
      foreignKey: "exhibition_id",
      onDelete: "CASCADE",
      hooks: true,
    });
    exhibition.hasMany(models.images, {
      as: "images",
      foreignKey: "exhibition_id",
      onDelete: "CASCADE",
      hooks: true,
    });
    exhibition.hasMany(models.likes, {
      as: "likes",
      foreignKey: "exhibition_id",
      onDelete: "CASCADE",
      hooks: true,
    });
    exhibition.belongsTo(models.users, {
      as: "author",
      foreignKey: "author_id",
      onDelete: "CASCADE",
      hooks: true,
    });
  };

  return exhibition;
};
