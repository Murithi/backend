const { getUserId } = require('../../utils')

const PersonnelQuery = {

    personnelFeed: async (parent, args, ctx, info) => { 
    const { filter, first, skip } = args
    const where = filter
      ? { OR: [{ firstName_contains: filter }, { lastName_contains: filter }, {idNumber_contains: filter }] }
      : {}
    
     const queriedPersonnel = await ctx.db.query.personnels({ first, skip, where }, info)
     return queriedPersonnel
     
  },

  personnel: async (parent, { id }, ctx, info) =>{
   const person = await ctx.db.query.personnel({ where: { id } }, info)
    return person;
  },

  personnelProjectAssignedFeed: async (parent, args, ctx, info)=> { 
    const where = {
      assignedToProject: true
    }
    
    const personnel = await ctx.db.query.personnel({ where }, info);
    return personnel;
  },


}

module.exports = { PersonnelQuery }
