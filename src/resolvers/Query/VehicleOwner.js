const { getUserId } = require('../../utils')

const VehicleOwnerQuery = {
    vehicleOwnerFeed: async (parent, args, ctx, info)=> { 
    const { filter, first, skip } = args //destructure input arguments
    const where = filter
        ? { OR: [{ name_contains: filter }, { email_contains: filter }, {id_contains:filter}] }
        : {}
    return ctx.db.query.vehicleOwners({first,skip, where},info)
  },

  vehicleOwner: async (parent, {id}, ctx, info) =>{  
  
    return ctx.db.query.vehicleOwner({ where: { id } }, info)
  },
}

module.exports={ VehicleOwnerQuery }