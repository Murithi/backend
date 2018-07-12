const { getUserId } = require('../../utils')


const VehicleInspectionQuery = {
    vehicleInspectionFeed: async (_, args, ctx, info) => {

        const { filter, first, skip } = args
        const where = filter
          ? {
            OR: [{ otherDetails_contains: filter }]
          }
          : {}
        
        const inspections = await ctx.db.query.vehicleInspections(
            {
                first, skip, where
            }, info)
        return inspections

     },
    initiatedVehicleInspectionsFeed: async (_, args, ctx, info) => {
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
        
        const initiatedInspections = ctx.db.query.vehicleInspections({ where }, info)
        return initiatedInspections


     },
    initiatedVehicleInspection: async (_, { id }, ctx, info) => { 
        
        return ctx.db.query.vehicleInspection({ where: { id } }, info)
        
    },
    approvedVehicleInspectionsFeed: async (_, args, ctx, info) => { 
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
        const approvedInspections = ctx.db.query.vehicleInspections({ where }, info)
        return approvedInspections
    },

}

module.exports = { VehicleInspectionQuery }
