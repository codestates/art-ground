var DataTypes = require("sequelize").DataTypes;
var _comments = require("./comments");
var _exhibition = require("./exhibition");
var _images = require("./images");
var _likes = require("./likes");
var _users = require("./users");

function initModels(sequelize) {
  var comments = _comments(sequelize, DataTypes);
  var exhibition = _exhibition(sequelize, DataTypes);
  var images = _images(sequelize, DataTypes);
  var likes = _likes(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  comments.belongsTo(exhibition, { as: "exhibition", foreignKey: "exhibition_id"});
  exhibition.hasMany(comments, { as: "comments", foreignKey: "exhibition_id"});
  images.belongsTo(exhibition, { as: "exhibition", foreignKey: "exhibition_id"});
  exhibition.hasMany(images, { as: "images", foreignKey: "exhibition_id"});
  likes.belongsTo(exhibition, { as: "exhibition", foreignKey: "exhibition_id"});
  exhibition.hasMany(likes, { as: "likes", foreignKey: "exhibition_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});
  exhibition.belongsTo(users, { as: "author", foreignKey: "author_id"});
  users.hasMany(exhibition, { as: "exhibitions", foreignKey: "author_id"});
  likes.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(likes, { as: "likes", foreignKey: "user_id"});

  return {
    comments,
    exhibition,
    images,
    likes,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
