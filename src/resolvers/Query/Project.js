const { getUserId } = require('../../utils')

const ProjectQuery = {
    project: async (_, { id }, ctx, info) => { 
        
    const project = await ctx.db.query.project({ where: { id } }, info)
    return project;
  },

  projectFeed: async (_, args, ctx, info)=> { 
    const { filter, first, skip } = args
    const where = filter
      ? {
        OR: [{ projectName_contains: filter }, { projectLocation_contains: filter }]
      }
      : {}
    const projects = await ctx.db.query.projects({ first, skip, where }, info)
    return projects
  },
}

module.exports = { ProjectQuery }
