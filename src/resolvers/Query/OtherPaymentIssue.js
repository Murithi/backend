const { getUserId } = require('../../utils')

const OtherPaymentIssueQuery = {
    otherPaymentsIssuedFeed: async (_, args, ctx, info)=> {
        const id = getUserId(ctx)
        const issuedPayments = await ctx.db.query.otherPaymentIssues( info)
        return issuedPayments; 
    },
    otherPaymentsFeedIssued:  async (_, { id }, ctx, info) =>{ 
        return ctx.db.query.otherPaymentIssue({ where: { id } }, info);
        },

}

module.exports = { OtherPaymentIssueQuery }
