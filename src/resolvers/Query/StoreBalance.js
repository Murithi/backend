const { getUserId } = require('../../utils')

const StoreBalanceQuery = {
    storeBalanceFeed: async (_, args, ctx, info)=> {
        const items = ctx.db.query.storeBalances(info);
        return items
    },

    storeBalance: async (_, { id }, ctx, info)=> {
        return ctx.db.query.storeBalance({ where: { id } }, info)
    
    }
}

module.exports = { StoreBalanceQuery }