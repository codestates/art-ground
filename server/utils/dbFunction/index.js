module.exports = {
  findAll: async (schema, options) => {
    return await schema.findAll(options);
  },
  findOne: async (schema, options) => {
    return await schema.findOne(options);
  },
  update: async (schema, set, options) => {
    return await schema.update(set, options);
  },
};
