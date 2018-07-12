const { getUserId } = require('../../utils')
const requestService = {

    addRequestService: async (_, {vehicleToBeServicedId, approxCostOFService,otherDetails, }, ctx, info) => {
        
        const userId = getUserId(ctx);
        const request = await ctx.db.mutation.createRequestService({
            data: {
                otherDetails,
                requestedBy: {
                    connect: { id: userId },
                },
                vehicleToBeServiced: {
                    connect: { id: vehicleToBeServicedId },
                },
                approxCostOFService
            }
        }, info);
        return request;
    },

    approveServiceRequisitionById: async (_, { id, approvalDate }, ctx, info)=> {
        
        const userId = getUserId(ctx)
        const approvalStatus = true;
       
        const requestExists = await ctx.db.exists.RequestService({
            id,
        });

        const requestingUserIsDirector = await ctx.db.exists.User({
            id: userId,
            role: 'DIRECTOR',
          })

        if (!requestExists ) { 
            throw new Error(`Requisition not found`)
        }
        if (requestingUserIsDirector) {
            return ctx.db.mutation.updateRequestService(
                {
                
                    where: { id },
                    data: {
    
                        approvalStatus,
                        requestApprovedBy: {
                            connect: { id: userId },
                        },
                        approvalDate                    
                    }
                },
                info); 
        } else {
            throw new Error(`You have no right to approve`)
        }

    },

};

module.exports = { requestService };