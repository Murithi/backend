const Role = {
    addRole: async  (_, args, ctx, info) => { 
        const { roleName, minimumSalary, maximumSalary } = args
        const role = await ctx.db.mutation.createRole({
            data: {
                roleName, minimumSalary, maximumSalary
            }
            
        }, info)
        
        return role
    }, 

    editRole: async  (_, args, ctx, info) => { 
        const { id, roleName, minimumSalary, maximumSalary } = args
        const role = await ctx.db.mutation.updateRole({
            where: {id},
            data: {
                roleName, minimumSalary, maximumSalary
            }
            
        }, info)
        return role;
    },

    describeRole: async  (_, args, ctx, info) => { 
        const { id, description } = args;
        const described = await ctx.db.mutation.updateRole({
            where: { id },
            data:{description}
        });
    },

    removeRole: async  (_, {id}, ctx, info) => { 
        const roleExists = await ctx.db.exists.Role({ id })
           
        if (!roleExists) throw new Error('Role not found')       
        
        return ctx.db.mutation.deleteRole({ where: { id } })
        
    }
}

module.exports = { Role }
