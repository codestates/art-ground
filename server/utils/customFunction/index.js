const { addToSet } = require("../redis/ctrl/setCache.ctrl");

module.exports = {
  addAttr: (obj, key, value) => {
    const newObj = Object.assign({}, obj);
    newObj[`${key}`] = value;
    return newObj;
  },
  setGrading: (type, id) => {
    if (type && id)
      type === 1 ? addToSet("standard", id) : addToSet("premium", id);
  },
};
