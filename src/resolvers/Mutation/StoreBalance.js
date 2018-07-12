const { getUserId } = require('../../utils')

const StoreBalance = {
    addStoreBalance: async (_, args, ctx, info)=>{
        const { materialsId, balance } = args;

        const balanceEntry = await ctx.db.mutation.createStoreBalance({
            data: {
                item: {
                    connect:
                        { id: materialsId }
                },
                balance,
               
            }
        },info)      

    },

    editStoreBalance: async (_, { id, materialsId, balance }, ctx, info)=> {
        const balanceEntry = await ctx.db.mutation.updateStoreBalance({
            data: {
                balance,
                item: { connect: { id: materialsId } }
            },
            where: { id }
            
        }, info)
    },
    removeBalanceEntry: async (_, {id}, ctx, info)=>{
        const balanceEntryExists = await ctx.db.exists.StoreBalance({
            id
        })
        if (!balanceEntryExists) {
            throw new Error(`Request does not exist`);
        }
        return ctx.db.mutation.deleteStoreBalance({ where: { id } })
    
    }
}

module.exports = { StoreBalance }
