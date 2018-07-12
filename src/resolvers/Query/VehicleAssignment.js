const { getUserId } = require('../../utils')

const VehicleAssignmentQuery = {
    vehicleAssignment: async (_, { id }, ctx, info)=> {
    return ctx.db.query.vehicleAssignment({ where: { id } }, info);
    return vehicleAssignment;
  },

  vehicleAssignmentFeed: async (_, args, ctx, info)=> { 
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ motorVehicle_contains: filter }]
      }
      : {}
    const vehicleAssignments = await ctx.db.query.vehicleAssignments({ first, skip, where }, info)
    return vehicleAssignments ;
    },
  
    vehicleRequisitionFeed: (_, args, ctx, info) => {
        
        const { filter, first, skip } = args //destructure input arguments
        const where = filter
            ? { OR: [{ project_contains: filter }, { section_contains: filter }, {id_contains:filter}] }
            : {}
        return ctx.db.query.vehicleRequisitions({first,skip, where},info)
      },
}

module.exports= { VehicleAssignmentQuery }