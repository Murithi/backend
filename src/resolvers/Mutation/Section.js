const Section = {

    addSection: async (_, args, ctx, info) => {
        
        const { sectionName,
            sectionDescription,
            sectionProjectId,
            sectionStartDate,
            sectionEndDate,
            sectionLocation
        } = args
        return ctx.db.mutation.createSection(
            {
                data: {
                    sectionName,
                    sectionDescription,                    
                    sectionStartDate,
                    sectionEndDate,
                    sectionLocation,
                    sectionProject: {
                        connect: { id: sectionProjectId }
                        },

                }
      
                , info
    
            }
        )
    },
    editSection: async (_, args, ctx, info) => {
        
        const {id, sectionName,
            sectionDescription,
            sectionProjectId,
            sectionStartDate,
            sectionEndDate,
            sectionLocation} = args
        return ctx.db.mutation.updateSection(
            {
                where:{id},
                data: {
                    sectionName,
                    sectionDescription,                    
                    sectionStartDate,
                    sectionEndDate,
                    sectionLocation,
                    sectionProject: {
                        connect: { id: sectionProjectId }
                        },

                }
      
                , info
    
            }
        )
    },
    removeSection: async (_, args, ctx, info) => {
        
        const { id } = args
        const sectionExists = await ctx.db.exists.Section({
            id,
        })

        if (!sectionExists) { 
            throw new Error('Section not found'); 
        }
        return ctx.db.mutation.deleteSection({ where: { id } });
        
    },
}
module.exports = { Section };