const { getUserId } = require('../../utils')

const RepairsRequisitionQuery = {

    repairsRequestFeed: async (_,  args, ctx, info)=> { 
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ otherDetails_contains: filter }]
      }
      : {}
    const repairs = await ctx.db.query.repairsRequisitions({ first, skip, where }, info);
    return repairs;
    },
    
  initiatedRepairsRequisitionsFeed: async (_, args, ctx, info)=> { 
    const id = getUserId(ctx) 
    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: id, role: 'ADMIN',
    })
    const requestingUserIsDirector = await ctx.db.exists.User({
      id: id, role: 'DIRECTOR',
    })
    if (requestingUserIsAdmin || requestingUserIsDirector) {    
      var where = { approvalStatus: false, }
    } else {  
      var where = { requestedBy: { id } }
    }
    const initiatedRequisitions = ctx.db.query.repairsRequisitions({ where }, info)
    return initiatedRequisitions;
    },
  
  initiatedRepairsRequisition: async (_, { id }, ctx, info) => {
    return ctx.db.query.repairsRequisition({ where: { id } }, info)
    },
  
  approvedRepairsRequisitionsFeed: async (_, args, ctx, info) => { 
    const id = getUserId(ctx) 
    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: id, role: 'ADMIN',
    })
    const requestingUserIsDirector = await ctx.db.exists.User({
      id: id, role: 'DIRECTOR',
    })
    if (requestingUserIsAdmin || requestingUserIsDirector) {    
      var where = { approvalStatus: true }
    } else {  
      var where = { requestedBy: { id } }
    }
    const approvedRequisitions = ctx.db.query.repairsRequisitions({ where }, info)
    return approvedRequisitions;
  },
}

module.exports = { RepairsRequisitionQuery }
