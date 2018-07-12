const { getUserId } = require('../../utils')

const RoleQuery = {
    
  personnelRole: async (_, { id }, ctx, info) =>{ 
    const role = await ctx.db.query.role({ where: { id } }, info)
    return role;

  },


  personnelRoleFeed: async (_, args, ctx, info)=> { 
    const { filter, first, skip } = args
    const where = filter
      ? { OR: [{ roleName_contains: filter }] }
      : {}
    
     const roles = await ctx.db.query.roles({ first, skip, where }, info)
     return roles
     
  },

  personnelRoleFeedByDesignation: async (_, args, ctx, info) =>{ 
    const { filter } = args
    const where = { roleName: filter };
    const roles = await ctx.db.query.roles({ where }, info);
    return roles
  },
}

module.exports = { RoleQuery }
