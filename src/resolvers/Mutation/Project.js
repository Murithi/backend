const Project = {

    addProject: async (_, args, ctx, info)=> {
        
        const { projectName,
            projectDescription,
            projectValuation,
            projectStartDate,
            projectCompletionDate,
            projectLocation} = args
        return ctx.db.mutation.createProject(
            {
                data: {
                    projectName, projectDescription, projectValuation, projectStartDate,
                    projectCompletionDate, projectLocation

                }
      
                , info
    
            }
        )
    },
    editProject: async (_, args, ctx, info) => {
    
        
        const { id, projectName,
            projectDescription,
            projectValuation,
            projectStartDate,
            projectCompletionDate,
            projectLocation} = args
        return ctx.db.mutation.updateProject(
            {   where:{id,},
                data: { 
                    projectName, projectDescription, projectValuation, projectStartDate,
                    projectCompletionDate, projectLocation

                }
      
                , info
    
            }
        )
    },
    removeProject: async (_, args, ctx, info) => {
         
        
        const { id } = args
        const projectExists = await ctx.db.exists.Project({
            id,
        })

        if (!projectExists) { 
            throw new Error('Project not found')
        }
        return ctx.db.mutation.deleteProject({where:{id}})
        
    },

}
module.exports = { Project }