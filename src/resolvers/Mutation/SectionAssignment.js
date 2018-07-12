const SectionAssignment = {
    addSectionAssignment: async (_, args, ctx, info) => { 
        const {
            projectID,
            personnelID,
            sectionID
        } = args;
        const sectionAssignment = await ctx.db.mutation.createSectionAssignment({
            data: {
                projectAssignedTo: {
                    connect: {id:projectID}
                },
                personAssignedTo: {
                    id:personnelID
                },
                sectionAssignedTo: {
                    connect:{id:sectionID}
                },
            }, info
        })
    },

    removeSectionAssignment: async (_, args, ctx, info)=> { 
     
        const sectionAssignmentExists = await ctx.db.exists.SectionAssignment({
            id,
        });
        if (!sectionAssignmentExists) { 
            throw new Error('Vehicle not found')
        }
        return ctx.db.mutation.deleteSectionAssignment({where:{id}})

    },

}

module.exports = { SectionAssignment };