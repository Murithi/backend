const VehicleAssignment = {
    addVehicleAssignment : async (_, args, ctx, info)=> {
        const {
            motorVehicleId,
            assigneeId,
            dateOfAssignment,
            
            
        } = args;
        
        const assignment = await ctx.db.mutation.createVehicleAssignment({
                data: {
                    motorVehicle: {
                        connect: { id: motorVehicleId }
                        
                    },
                    assignee:{
                        connect: { id: assigneeId }
                        
                    },
                    dateOfAssignment
                    
                },
                info
            })
        return assignment;
    },

    editVehicleAssignment: async (_, args, ctx, info)=> { 
        const {
            id,
            motorVehicleId,
            assigneeId,
            dateOfAssignment,
           
        } = args;

        const assignment = await ctx.db.mutation.updateVehicleAssignment({
            where:{id},
            data: {
                
                motorVehicle: {
                    connect: { id: motorVehicleId }
                    
                },
                assignee:{
                    connect: { id: assigneeId }
                    
                },
                dateOfAssignment
            },
            info
        })
    return assignment;
    },

    removeVehicleAssignment: async (_, { id }, ctx, info)=> { 
        const vehicleAssignmentExists = await ctx.db.exists.VehicleAssignment({
            id,
        })

        if (!vehicleAssignmentExists) { 
            throw new Error('Vehicle Assignment not found')
        }

        return ctx.db.mutation.deleteVehicleAssignment({where:{id}})
    },


}

module.exports = { VehicleAssignment };