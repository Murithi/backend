
const { getUserId } = require('../../utils')
const paymentIssues = {
    addServicePaymentIssue: async (_, args, ctx, info)=> { 
        const id = getUserId(ctx)
        const {
            amountIssued,
            requestId,
            dateIssued
            
        } = args;
        const issue= await ctx.db.mutation.createPaymentIssue({
            data: {
                amountIssued,
                dateIssued,
                requestedServicePayment: {
                    connect: { id: requestId }
                },
                 issuedBy: {
                    connect:{id}
                }, 
            }
        }, info);
        return issue;

    },

    reportPayments: async (_, args, ctx, info)=> { 
        const userId = getUserId(ctx);
        const {
            id,
            amountCharged,
            recieptNumber,
            amountReturned,
            dateReported
        } = args;
        const cashReported = true;
        const requestingUserIsAccountant = await ctx.db.exists.User({
            id: userId,
            role: 'ACCOUNTANT',
        });
        if (requestingUserIsAccountant) {
            const report = await ctx.db.mutation.updatePaymentIssue({
                where: {id},
                data: {
                    amountCharged,
                    recieptNumber,
                    amountReturned,
                    dateReported,
                    cashReported,
                }
            }, info)
    
            return report;  
        }else {
            throw new Error(`You have no right to access this page`)
        }
        
    },
    addRepairsPaymentIssue: async (_, args, ctx, info)=> { 
        const id = getUserId(ctx)
        const {
            amountIssued,
            requestId,
            dateIssued
            
        } = args;
        const issue= await ctx.db.mutation.createPaymentIssue({
            data: {
                amountIssued,
                dateIssued,                
                repairsRequisitionPayment: {
                    connect: { id: requestId }
                },
                issuedBy: {
                    connect:{id}
                }, 
            }
        }, info);
        return issue;

    },

    addMaterialsPaymentIssue: async (_, args, ctx, info)=> {
        const id = getUserId(ctx)  
        const { amountIssued, requestId, dateIssued } = args;
        const issue= await ctx.db.mutation.createPaymentIssue({
            data: {
                amountIssued,
                dateIssued,                
                requestedMaterialsPayment: {
                    connect: { id: requestId }
                },
                issuedBy: {
                    connect:{id}
                }, 
            }
        }, info);
        return issue;
    },
    addInspectionPaymentIssue: async (_, args, ctx, info)=> {
        const id = getUserId(ctx)  
        const { amountIssued, requestId, dateIssued } = args;
        const issue= await ctx.db.mutation.createPaymentIssue({
            data: {
                amountIssued,
                dateIssued,                
                requestedInspectionPayment: {
                    connect: { id: requestId }
                },
                issuedBy: {
                    connect:{id}
                }, 
            }
        }, info);
        return issue;
    },
  
}

module.exports={paymentIssues}