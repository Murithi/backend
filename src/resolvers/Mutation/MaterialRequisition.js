
const { getUserId } = require('../../utils')
const MaterialRequisition = {
    addMaterialRequisition: async (_, args, ctx, info) => {
        const userId = getUserId(ctx);
        const {
            materialTypeId,
            quantity,
            supplierId,
            otherDetails,
            approxCost,
            paymentMode

        } = args;

        const material = await ctx.db.mutation.createMaterialRequisition({
            data: {
                otherDetails,
                approxCost,
                paymentMode,
                quantity,
                materialType: {
                    connect: { id: materialTypeId }
                },
                proposedSupplier: {
                    connect: { id: supplierId }
                    
                },
                requestedBy: {
                    connect: {
                        id:userId
                    }
                }
            }
        }, info)

        return material
        
    },

    approveMaterialRequisition: async (_, { id, approvalDate }, ctx, info)=> {
        const userId = getUserId(ctx)
        const approvalStatus = true
        const requestExists = await ctx.db.exists.MaterialRequisition({
            id,
        })
        if (!requestExists ) { 
            throw new Error(`Requisition not found`)
        }
        const requestingUserIsDirector = await ctx.db.exists.User({
            id: userId,
            role: 'DIRECTOR',
        })
        if (requestingUserIsDirector) { 
            const updated = await ctx.db.mutation.updateMaterialRequisition({
                where: { id },
                data: {
                    approvalStatus,
                    approvalDate,
                    requestApprovedBy: {
                        connect: {
                             id: userId 
                        }
                    },
                }
            }, info);
            return updated
        } else {
            throw new Error(`Not authorised`)
        }
    },

    deleteMaterialRequisition: async (_, { id }, ctx, info)=> {
        const requestExists = await ctx.db.exists.MaterialRequisition({
            id,
        })
        if (!requestExists ) { 
            throw new Error(`Requisition not found`)
        }
        return ctx.db.mutation.deleteMaterialRequisition({ where: { id } }, info)
    
    
    }
}

module.exports = { MaterialRequisition }
