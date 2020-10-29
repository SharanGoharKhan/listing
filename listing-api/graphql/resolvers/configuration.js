const Configuration = require('../../models/configuration')

module.exports = {
  Query: {
    configuration: async(_, args, context) => {
      const configuration = await Configuration.findOne()
      if (!configuration) {
        return {
          _id: '',
          itemPrefix: '',
          mongodbUrl: '',
          email: '',
          password: '',
          enableEmail: true,
          currency: '',
          currencySymbol: ''
        }
      }
      return {
        ...configuration._doc,
        _id: configuration.id
      }
    }
  },
  Mutation: {
    saveOrderConfiguration: async(_, args, context) => {
      console.log('saveOrderConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.itemPrefix = args.configurationInput.itemPrefix
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveEmailConfiguration: async(_, args, context) => {
      console.log('saveEmailConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.email = args.configurationInput.email
      configuration.password = args.configurationInput.password
      configuration.enableEmail = args.configurationInput.enableEmail
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveMongoConfiguration: async(_, args, context) => {
      console.log('saveMongoConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.mongodbUrl = args.configurationInput.mongodbUrl
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    uploadToken: async(_, args, context) => {
      console.log(args.pushToken)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.pushToken = args.pushToken
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    },
    saveCurrencyConfiguration: async(_, args, context) => {
      console.log('saveCurrencyConfiguration', args.configurationInput)
      let configuration = await Configuration.findOne()
      if (!configuration) configuration = new Configuration()
      configuration.currency = args.configurationInput.currency
      configuration.currencySymbol = args.configurationInput.currencySymbol
      const result = await configuration.save()
      return {
        ...result._doc,
        _id: result.id
      }
    }
  }
}
