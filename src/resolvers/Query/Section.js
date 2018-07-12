
const { getUserId } = require('../../utils')

const SectionQuery = {
    section: async (_, { id }, ctx, info)=> { 
    const section = await ctx.db.query.section({ where: { id } }, info)
    return section;
  },

  sectionFeed: async (_, args, ctx, info)=> { 
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ sectionName_contains: filter }, { sectionLocation_contains: filter }]
      }
      : {}
    
    const sections = await ctx.db.query.sections({ first, skip, where }, info)
    return  sections;
  },
  
  sectionAssignment: async (_, {personnelId}, ctx, info)=>{
    const section = await ctx.db.query.sectionAssignment({
      where: { personAssignedTo_contains: personnelId }
    }, info)
    return section;
  },


  sectionAssignmentFeed: async (_, args, ctx, info) => {
    const { filter, first, skip } = args
    const where = filter
      ? {
       OR:  [{ personAssignedTo_contains: personnelId }]
      }
      : {}    
    
    const sections = await ctx.db.query.sectionAssignment({ first, skip, where }, info)
    return  sections;
  },
}

module.exports = { SectionQuery }
