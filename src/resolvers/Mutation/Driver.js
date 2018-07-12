const Driver = {
    addDriver: async (_, args, ctx, info) => { 
        const { licenseNumber, licenseExpiry, personnelId } = args;
        const Driver = await ctx.db.mutation.createDriver(
            {
                data: {
                    licenseNumber,
                    licenseExpiry,
                    personnelDetails: {
                        connect:{id:personnelId}
                    },
                }
                , info
            }
        )
        return Driver;
    },
    editDriver: async (_, args, ctx, info) => { 
        const {id, licenseNumber, licenseExpiry, personnelId } = args;

        const Driver = await ctx.db.mutation.createDriver(
            {   where:{id,},
                data: {
                    licenseNumber,
                    licenseExpiry,
                    personnelDetails: {
                        connect:{id:personnelId}
                    },
                }
                , info
            }
        )
        return Driver;
    },
    removeDriver: async (_, args, ctx, info) => {
        const driverExists = await ctx.db.exists.Driver({
            id,
        });

        if (!driverExists) { 
            throw new Error('Driver not found');
        }

        return ctx.db.mutation.deleteDriver({ where: { id } }); 
     },
}

module.exports = { Driver }
