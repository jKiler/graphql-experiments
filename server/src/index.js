const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const { formatError } = require('apollo-errors')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/public-daisyscourge-490/graphql-experiments/dev',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
})

const options = {
  port: 4000,
  formatError
}

server.start(options, ({ port }) => console.log(`Server is running on http://localhost:${port}`))