module.exports.isValid = () => {
  const args = [...arguments];

  return args.every((el) => !!el);
};
