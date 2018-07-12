
const { getUserId } = require('../../utils')

const DriverQuery = {
    driver: async (_, { id }, ctx, info)=> { 
    const driver = await ctx.db.query.driver({ where: { id } }, info);
    return driver
  },

  driverFeed: async (_, args, ctx, info) => { 
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ licenseNumber_contains: filter }]
      }
      : {}
    
    const drivers = await ctx.db.query.drivers({ first, skip, where }, info);
    return drivers;
  },
}

module.exports={ DriverQuery }