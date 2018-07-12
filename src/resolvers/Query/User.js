const { getUserId } = require('../../utils')

const UserQuery = {
    userFeed: (_, args, ctx, info)=> { 
    const { filter, first, skip } = args;
    const where = filter
      ? { OR: [{name_contains:filter}, {email_contains:filter}]}
      : {}
    return ctx.db.query.users({ first, skip, where }, info);
  },

  user: (_, args, ctx, info) => {
    return ctx.db.query.user(
      {
            where: {
                id: args.id,
            },
      },
      info,
    )
  },
  me: async (_, args, ctx, info) =>{
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

}

module.exports = { UserQuery }