const {getUserId} = require('../../utils')
const VehicleInspection = {
    addVehicleInspection: async (_, args, ctx, info) => {
        const userId = getUserId(ctx)
        const { vehicleId,
            approxCostOfInspection,
            otherDetails
        } = args

        const request = await ctx.db.mutation.createVehicleInspection({
            data: {
                otherDetails,
                requestedBy: {
                    connect: { id: userId },
                },
                vehicleToBeInspected: {
                    connect: { id: vehicleId },
                },
                approxCostOfInspection,
            }
        }, info)

        return request

     },
    approveVehicleInspection: async (_, { id, approvalDate }, ctx, info) => {
        const userId = getUserId(ctx)
        const approvalStatus = true
        const requestExists = await ctx.db.exists.VehicleInspection({
            id
        })
        if (!requestExists) {
            throw new Error(`Request does not exist`)
        }
        const requestingUserIsDirector = await ctx.db.exists.User({
            id: userId,
            role: 'DIRECTOR',
        })
        
        if (requestingUserIsDirector) { 
            return ctx.db.mutation.updateVehicleInspection({
                where: { id },
                data: {
                    approvalStatus,
                    approvalDate,
                    requestApprovedBy: {
                        connect: { id: userId },
                    },
                }
            },info);
        } else {
            throw new Error(`Not authorised`)
        }
     },

    deleteVehicleInspection: async (_, { id }, ctx, info) => {
        const requestExists = await ctx.db.exists.VehicleInspection({
            id
        })
        if (!requestExists) {
            throw new Error(`Request does not exist`);
        }
        return ctx.db.mutation.deleteVehicleInspection({ where: { id } });
     }
}

module.exports = { VehicleInspection }
