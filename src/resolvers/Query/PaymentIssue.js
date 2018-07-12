const { getUserId } = require('../../utils')

const PaymentIssueQuery = {
    paymentsFeedIssuedPayment:  async (parent, args, ctx, info)=> {
    const id = getUserId(ctx)
    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: id,
      role: 'ADMIN',
    })
    const requestingUserIsDirector = await ctx.db.exists.User({
      id: id,
      role: 'DIRECTOR',
    })
    const requestingUserIsAccountant = await ctx.db.exists.User({
      id: id,
      role: 'ACCOUNTANT',
    })
    if (requestingUserIsAdmin || requestingUserIsDirector || requestingUserIsAccountant) {
      var where = {
        cashReported: false,  
      }
    }   
   const issuedPayments = await ctx.db.query.paymentIssues({ where  }, info)
   return issuedPayments; 
  
  },
  
  paymentIssueFeed: async (parent, args, ctx, info) => {
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ otherDetails_contains: filter }]
      }
      : {}
      
      const payments = await ctx.db.query.paymentIssues({ first, skip, where }, info)
      return  payments;
     
  },

  paymentIssue: async (parent, { id }, ctx, info)=> { 
    return ctx.db.query.paymentIssue({ where: { id } }, info);
    },
  
}

module.exports = {PaymentIssueQuery}