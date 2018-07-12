const { getUserId } = require('../../utils')

const MaterialCostingQuery = {
    materialsCostingFeed:  async (_, args, ctx, info)=> {
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ materialDescription_contains: filter }]
      }
      : {}
    const materials = await ctx.db.query.materialsCostings({ first, skip, where }, info);

    return materials;
  },

  materialsCosting: async (_, { id }, ctx, info)=> {
    return ctx.db.query.materialsCosting({ where: { id } }, info);
  },
}

module.exports = { MaterialCostingQuery }
