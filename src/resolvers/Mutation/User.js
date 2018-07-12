const User = {
    updateUserRole: async (_, args, ctx, info) => { 
        let { id, role, } = args
        role = role.replace(/^"(.*)"$/, '$1')        
        const user = await ctx.db.mutation.updateUser(
            {
                where: { id },
                
                data: { role }            
            }
            , info
        )
        return user
    },

    changeUser: async (_, {id}, ctx, info) => { 
        const userExists = await ctx.db.query.user(
            {
                where: { id }
            }
            , info
        )

        if (userExists.authorized === true) {
            authorized = false
            locked = true
        } else { 
            authorized = true
            locked = false
        }
        const removed = await ctx.db.mutation.updateUser(
            {
                where: { id },
                data: { locked, authorized }
            
            }
        )
        return removed
    },

    enableUser: async (_, {id}, ctx, info) => {
        authorized = true        
        const removed = await ctx.db.mutation.updateUser({
            where: { id },
            data: {  authorized }
            
        })
        return removed
     },

    deleteUser: async (_, args, ctx, info) => { 
        const userExists = await ctx.db.exists.User({ id })
        
        if (!userExists) throw new Error('User not found')     

        return ctx.db.mutation.deleteUser({ where: {  id } })
    }
}

module.exports = { User }
