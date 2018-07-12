const { getUserId } = require('../../utils')

const SupplierQuery = {
    suppliersFeed: async (_, args, ctx, info)=> {
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ otherDetails_contains: filter }]
      }
      : {}
    const suppliers = await ctx.db.query.suppliers({ first, skip, where }, info);

    return suppliers;
  },

  getSupplier: async (_, { id }, ctx, info) =>{
    return ctx.db.query.supplier({ where: { id } }, info)
  },
}

module.exports={SupplierQuery}