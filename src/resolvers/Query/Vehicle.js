const { getUserId } = require('../../utils')

const VehicleQuery = {
    vehicleFeed: async (_, args, ctx, info) => {
        const { filter, first, skip } = args // destructure input arguments
        const where = filter
            ? {
                OR: [
                    { registrationNumber_contains: filter },
                    { logBookNumber_contains: filter }
                ]
            }
            : {}
    
        return ctx.db.query.vehicles({ first, skip, where }, info)
  
    },

    vehicle: async (_, { id }, ctx, info) => {  
        return ctx.db.query.vehicle({ where: {id} }, info)
    },
  
    vehicleDisplayFeed: async (_, args, ctx, info) => {
        const where = {
             assigned:false
        }
        
        return ctx.db.query.vehicles({ where }, info)
        
    }, 
  
    vehiclesAssignedFeed: async (_, args, ctx, info)=> { 
    const where = {
      assigned: true
    }

    const vehicles = await ctx.db.query.vehicles({ where }, info);
    return vehicles;
  
  },
}

module.exports = { VehicleQuery }
