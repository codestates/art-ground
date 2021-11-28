module.exports = {
  addAttr: (obj, key, value) => {
    const newObj = Object.assign({}, obj);
    newObj[`${key}`] = value;
    return newObj;
  },
};
