const { getUserId } = require('../../utils')

const PersonnelAttendanceQuery = {
    personnelAttendance: async ( _, { id }, ctx, info)=>{ 
    
      const attendance = await ctx.db.query.personnelAttendance({ where: { id } }, info);
    return attendance;
  },

    personnelAttendanceFeed: async (_, args, ctx, info) => {
      
    const { filter, first, skip } = args;
    const where = filter
      ? { OR: [{ dateofAttendance_contains: filter }] }
      : {}
    
    const personnelAttendance = await ctx.db.query.personnelAttendances({ first, skip, where }, info);
    return personnelAttendance;

  },
}

module.exports = { PersonnelAttendanceQuery }