const authResolver = require('./auth')
const configurationResolver = require('./configuration')
const userResolver = require('./user')
const itemResolver = require('./item')

const rootResolver = {
  Query: {
    ...authResolver.Query,
    ...configurationResolver.Query,
    ...userResolver.Query,
    ...itemResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...configurationResolver.Mutation,
    ...userResolver.Mutation,
    ...itemResolver.Mutation
  }
}

module.exports = rootResolver
