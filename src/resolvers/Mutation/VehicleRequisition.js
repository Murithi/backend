const { getUserId } = require('../../utils')

const VehicleRequisition = {

    addVehicleRequisition: async (_, args, ctx, info)=>{
        const userId = getUserId(ctx)
        const { vehicleType, estimatedNoOfHours, project, section, estimatedCost, requestStatus } = args
        return ctx.db.mutation.createPost(
            {
                data: {
                vehicleType, estimatedNoOfHours, project,
                section, estimatedCost, requestStatus,
                requestedBy: { connect: { id: userId } }
            },
            info
            }
        )
    }
}

module.exports = { VehicleRequisition }