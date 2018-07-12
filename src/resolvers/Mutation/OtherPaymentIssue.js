const { getUserId } = require('../../utils')
const OtherPaymentIssues = {
    addChequePaymentDetails: async (_, args, ctx, info)=> { 
        const id= getUserId(ctx)
        const {
            amountPaid,
            invoiceNumber,
            discountRecieved,
            datePaid,
            otherDetails,
            materialPaymentsId
        } = args;

        const detail = await ctx.db.mutation.createOtherPaymentIssue({
            data: {
                amountPaid,
                invoiceNumber,
                discountRecieved,
                datePaid,
                otherDetails,
                issuedBy: {
                    connect:{id}
                },
                requestedMaterialsPayment: {
                    connect: { id: materialPaymentsId }
                    
                }
            }
        })
        return detail
    }
}

module.exports = { OtherPaymentIssues }
