module.exports = {
  finAll: async (schema, options) => {
    return await schema.findAll(options);
  },
  findOne: async (schema, options) => {
    return await schema.findOne({ options });
  },
};
