const { getUserId } = require('../../utils')



const StoreTransaction = {

    materialReciept: async (_, args, ctx, info) => {
        const id = getUserId(ctx) 
        const { itemId, balBefore, unitsRecieved,
             dateOfTran, materialsRecievedFrom, StoreBalId, deliveryNote
        } = args
        const tranType='RECIEPTS'
        const balAfter=balBefore + unitsRecieved
        const reciept = await ctx.db.mutation.createStoreTransaction(
            {
                data: {
                    itemTransacted: {
                        connect:{ id:itemId}
                    },
                    balanceBefore: balBefore,
                    balanceAfter: balAfter,
                    unitsTransacted: unitsRecieved,
                    transactionType: tranType,
                    transactionDate: dateOfTran,
                    deliveryNote,
                    materialsRecievedFrom: {
                        connect:{id:materialsRecievedFrom}
                    },
                    transactedBy:{
                        connect: { id }
                        
                    }
                }
            }
            )
        // console.log(`Material Saved ${reciept}`);
        const newBal = await ctx.db.mutation.updateStoreBalance({
            where: { id: StoreBalId },
            data: { balance: balAfter }
            
        },info)
        
        return reciept
        
    },

    materialIssue: async (_, args, ctx, info) => {
        const id = getUserId(ctx) 
        const { itemId, balBefore, unitsIssued, 
             dateOfTran, materialsIssuedTo, StoreBalId
        } = args
        const tranType='ISSUES'
        const balAfter=balBefore - unitsIssued
        const reciept = await ctx.db.mutation.createStoreTransaction(
            {
                data: {
                    itemTransacted: {
                        connect: { id: itemId }
                        
                    },
                    balanceBefore: balBefore,
                    balanceAfter: balAfter,
                    unitsTransacted: unitsIssued,
                    transactionType: tranType,
                    transactionDate: dateOfTran,
                    materialsIssuedTo: {
                        connect: { id: materialsIssuedTo }
                        
                    },
                    transactedBy:{
                        connect: { id }
                        
                    }
                }
            },
            info)
        
            const newBal = await ctx.db.mutation.updateStoreBalance({
                where: { id: StoreBalId },
                data: {balance:balAfter}
            }, info)
        
        return reciept
    },

    removeTransaction: async (_, { id }, ctx, info) => {
        
        const TransactionExists = await ctx.db.exists.StoreBalance({ id })
        if (!TransactionExists) {
            throw new Error('Transaction not found')
        }
        return ctx.db.mutation.deleteTransaction({ where: { id } })
        
    }

}

module.exports = { StoreTransaction }
