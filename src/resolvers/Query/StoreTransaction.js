const { getUserId } = require('../../utils')


const StoreTransactionQuery = {
    storeTransactionFeed: async (_, args, ctx, info) => {
        const transactions = await ctx.db.query.storeTransactions(info)
        return transactions
    },
    storeTransaction: async (_, { id }, ctx, info) => {
        return ctx.db.query.storeTransaction({ where: { id } }, info)
        
    }
}

module.exports = { StoreTransactionQuery }
