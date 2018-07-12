const { getUserId } = require('../../utils')

const RequestServiceQuery = {


    requestServiceFeed: async (_,  args, ctx, info) => { 
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ otherDetails_contains: filter }]
      }
      : {}
    const repairs = await ctx.db.query.requestServices({ first, skip, where }, info);
    return repairs;
  },
  initiatedRequisition: async (_, { id }, ctx, info)=> {
    return ctx.db.query.requestService({ where: { id } }, info)
  },
  InitiatedRequisitionsFeed: async (_, args, ctx, info) =>{
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
    const initiatedRequisitions = ctx.db.query.requestServices({ where }, info)
    return initiatedRequisitions;
  },

  approvedRequisitionsFeed: async (_, args, ctx, info) =>{
    const id = getUserId(ctx)

  
    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: id,
      role: 'ADMIN',
    })

    const requestingUserIsDirector = await ctx.db.exists.User({
      id: id,
      role: 'DIRECTOR',
    })

    if (requestingUserIsAdmin || requestingUserIsDirector) {
    
      var where = {
        approvalStatus: true,
        paymentsDetails:null,
     
      }
    } else {
  
      var where = {
        approvalStatus: true,
        paymentsDetails: null,
        requestedBy: {
          id
        }
      }
    }

   
    const approvedRequisitions = ctx.db.query.requestServices({ where }, info)
    return approvedRequisitions;
  },
}

module.exports={ RequestServiceQuery }