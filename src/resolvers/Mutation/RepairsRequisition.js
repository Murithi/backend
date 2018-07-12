const { getUserId } = require('../../utils')
const RepairsRequisition = {

    addRepairsRequisition: async (_, args, ctx, info)=> {
        const userId = getUserId(ctx);
        const {otherDetails, vehicleToBeRepaired, approxCostOfRepair}=args
        const request = await ctx.db.mutation.createRepairsRequisition({
            data: {
                otherDetails,
                requestedBy: {
                    connect: { id: userId },
                },
                vehicleToBeRepaired: {
                    connect: { id: vehicleToBeRepaired },
                },
                approxCostOfRepair,
            }
        }, info);
        return request;
    },

    approveRepairsRequistion: async (_, { id, approvalDate }, ctx, info)=> {
        const userId = getUserId(ctx);
        const approvalStatus = true;
        const requestExists = await ctx.db.exists.RepairsRequisition({
            id,
        });
        if (!requestExists ) { 
            throw new Error(`Requisition not found`)
        }
        const requestingUserIsDirector = await ctx.db.exists.User({
            id: userId,
            role: 'DIRECTOR',
        })
        if (requestingUserIsDirector) { 
            return ctx.db.mutation.updateRepairsRequisition({
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

    deleteRepairsRequest: async (_, { id }, ctx, info)=> {
        const requestExists = await ctx.db.exists.RepairsRequisition({
            id
        })
        if (!requestExists) {
            throw new Error(`Request does not exist`);
        }
        return ctx.db.mutation.deleteRepairsRequisition({ where: { id } });
    },
};
module.exports = { RepairsRequisition };