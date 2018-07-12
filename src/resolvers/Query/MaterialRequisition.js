
const { getUserId } = require('../../utils')

const MaterialRequisitionQuery = {

    materialRequisitionFeed: async (_, args, ctx, info) =>{
    const materials = ctx.db.query.materialRequisitions( info)
    return materials
    },
    

    getMaterialRequisition: async (_, { id }, ctx, info) =>{ 
    return ctx.db.query.materialRequisition({ where: { id } }, info)

    },

    initiatedMaterialRequisitionsFeed: async (_, args, ctx, info) =>{
        const id = getUserId(ctx) 
    const requestingUserIsAdmin = await ctx.db.exists.User({
      id: id, role: 'ADMIN',
    })
    const requestingUserIsDirector = await ctx.db.exists.User({
      id: id, role: 'DIRECTOR',
    })
    if (requestingUserIsAdmin || requestingUserIsDirector) {    
        var where = { approvalStatus: false }
        
    } else {  

        var where = { requestedBy: { id } }
        
    }
    
        const initiated = ctx.db.query.materialRequisitions({ where }, info);
        return initiated;    
    
        
    },

    approvedMaterialRequisitionsFeed: async (_, args, ctx, info)=> {
        const id = getUserId(ctx) 
        const requestingUserIsAdmin = await ctx.db.exists.User({
        id: id, role: 'ADMIN',
        })
        const requestingUserIsDirector = await ctx.db.exists.User({
        id: id, role: 'DIRECTOR',
        })
        if (requestingUserIsAdmin || requestingUserIsDirector) {    
        var where = { approvalStatus: true }
        } else {  
        var where = { requestedBy: { id } }
        }
        const approvedRequisitions = ctx.db.query.materialRequisitions({ where }, info)
        return approvedRequisitions;
    }

}

module.exports = { MaterialRequisitionQuery }
