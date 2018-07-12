const { getUserId } = require('../../utils')

const VehicleOwner = {
    addVehicleOwner: async (_, args, ctx, info) => {
        const { name, email, phone } = args
        owner = await ctx.db.mutation.createVehicleOwner({ data: { name, email, phone } })
        return owner
    },
    
    editVehicleOwner: async (_, args, ctx, info) => {
        const { id, name, email, phone } = args
        owner = await ctx.db.mutation.updateVehicleOwner(
            {
                where: { id },
                data: { name, email, phone }
            })
        return owner
    },
    removeVehicleOwner: async (_, {id}, ctx, info) => {
        const vehicleOwnerExists = await ctx.db.exists.VehicleOwner({id })
          if (!vehicleOwnerExists) {
            throw new Error(`Vehicle Owner not found`)
          }
      
          return ctx.db.mutation.deleteVehicleOwner({ where: { id } })
    }

}

module.exports = { VehicleOwner }
