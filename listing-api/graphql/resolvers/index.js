const authResolver = require('./auth')
const configurationResolver = require('./configuration')
const userResolver = require('./user')
const itemResolver = require('./item')
const categoryResolver = require('./category')
const subCategoryResolver = require('./subCategory')
const zoneResolver = require('./zone')

const rootResolver = {
  Query: {
    ...authResolver.Query,
    ...configurationResolver.Query,
    ...userResolver.Query,
    ...itemResolver.Query,
    ...categoryResolver.Query,
    ...subCategoryResolver.Query,
    ...zoneResolver.Query
  },
  Mutation: {
    ...authResolver.Mutation,
    ...configurationResolver.Mutation,
    ...userResolver.Mutation,
    ...itemResolver.Mutation,
    ...categoryResolver.Mutation,
    ...subCategoryResolver.Mutation,
    ...zoneResolver.Mutation
  },
  Subscription: {
    ...itemResolver.Subscription
  }
}

module.exports = rootResolver
