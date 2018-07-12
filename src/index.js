


const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'https://eu1.prisma.sh/eric-murithi-19fbd7/kewaservice/kewaservicedev',
        
         debug:true
        }),
    }),
})
  
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))

// endpoint: 'https://eu1.prisma.sh/eric-murithi-19fbd7/kewaservice/kewaservicedev',