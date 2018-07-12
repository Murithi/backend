const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Auth = {
    signup: async (_, args, ctx, info) => { 

        const password = await bcrypt.hash(args.password, 10)
        const { name, idNumber, email } = args
        
        const user = await ctx.db.mutation.createUser({
          data: { name, password, email,  personnelDetails: {
            connect: { idNumber: idNumber },
        },  },
        })
        const APP_SECRET = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjhkOWQ0NDZkLWRlNDgtNGI3ZC1iNTg5LWUxZDBjMzAwZjMwMCIsImlhdCI6MTUzMTIwNzExNiwiZXhwIjoxNTMxMjEwNzE2fQ.3RUAawLX4SHrumui4tNhjr73WeUEeLj_6ZIgmT1Nqxw"

        return {
        
          token: jwt.sign({ userId: user.id }, APP_SECRET),
          user,
        }
    },

    login: async (_, { email, password }, ctx, info) => { 

        const user = await ctx.db.query.user({ where: { email } })
        if (!user) throw new Error(`No such user found for email: ${email}`)
        

        const valid = await bcrypt.compare(password, user.password)        
        if (!valid) throw new Error('Invalid password')
        const APP_SECRET = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6IjhkOWQ0NDZkLWRlNDgtNGI3ZC1iNTg5LWUxZDBjMzAwZjMwMCIsImlhdCI6MTUzMTIwNzExNiwiZXhwIjoxNTMxMjEwNzE2fQ.3RUAawLX4SHrumui4tNhjr73WeUEeLj_6ZIgmT1Nqxw"
        

        return {
        token: jwt.sign({ userId: user.id }, APP_SECRET),
        user,
        }
        
    },

    
}

module.exports = { Auth }
