
const { getUserId } = require('../../utils')

const Vehicle = {
    addVehicle: async (_, args, ctx, info) => { 
        const userId = getUserId(ctx)
        const {
            registrationNumber, logBookNumber, model, fuelType,
            insuranceValuation, insuranceRenewalDate, manufactureDate,
            ownerId
        } = args
        const vehicle = await ctx.db.mutation.createVehicle(
            {
                data: {
                    registrationNumber, logBookNumber, model, fuelType,
                    insuranceValuation, insuranceRenewalDate, manufactureDate,
                    owner: {
                        connect: { id: ownerId },
                    },
                }                 
    
            } , info
        )
        return vehicle
    }, 

    editVehicle: async (_, args, ctx, info) => { 
        const {
            registrationNumber, logBookNumber, model, fuelType,
            insuranceValuation, insuranceRenewalDate, manufactureDate,
            ownerId, id
        } = args
        const vehicle= ctx.db.mutation.updateVehicle({
            where: { id },
            
            data: {
                id, registrationNumber, logBookNumber, model, fuelType,
            insuranceValuation, insuranceRenewalDate, manufactureDate,
            owner: {
                connect: { id: ownerId },
                },
            }
        })
        return vehicle
    },

    removeVehicle: async (_, args, ctx, info) => { 
        const vehicleExists = await ctx.db.exists.Vehicle({
            id,
        })

        if (!vehicleExists) { 
            throw new Error('Vehicle not found')
        }
        return ctx.db.mutation.deleteVehicle({ where: { id } })
        
    },

    editVehicleAssignee: async (_, args, ctx, info) => { 
        const { id, assigneeId, assigned, dateAssigned } = args
        const vehicleExists = await ctx.db.exists.Vehicle({
            id,
        })

        if (!vehicleExists) { 
            throw new Error('Vehicle not found')
        }
        const vehicle = ctx.db.mutation.updateVehicle({
            where: { id },
            
            data: {
                assigned,
                dateAssigned,
                assignee: {
                connect: { id: assigneeId },
                },
            },
            info,
        })
        return vehicle
    },

 




}

module.exports = { Vehicle }
