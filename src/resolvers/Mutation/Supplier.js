const { getUserId } = require('../../utils')
const Supplier = {
    
    createSupplier: async (_, args, ctx, info) => {
        const userId = getUserId(ctx);
        const { materialsId, negotiatedRate, otherDetails, supplierName, supplierPhone
        } = args;

        const createdSupplier = await ctx.db.mutation.createSupplier({
            data: {
                negotiatedRate,
                otherDetails, supplierName, supplierPhone,
                material: {
                    connect: {
                        id:materialsId
                    },
                },
                createdBy: {
                    connect: {
                        id:userId
                    },
                }
            }
        }, info);

        return createdSupplier;

    },

    editSupplier: async (_, args, ctx, info) =>{
        const { materialsId, negotiatedRate, otherDetails, id, supplierName, supplierPhone } = args;

        const updatedSupplier = await ctx.db.mutation.updateSupplier({
            where: { id },
            data: {
                negotiatedRate,
                otherDetails, supplierName, supplierPhone,
                
               
            }
        }, info);
        return updatedSupplier;
    }


}

module.exports = { Supplier };