const { PubSub } = require('apollo-server-express')

const CREATE_AD = 'CREATE_AD'

const publishToDashboard = (item, origin) => {
    const subscribeCreateAd = {
      item,
      origin
    }
    pubsub.publish(CREATE_AD, { subscribeCreateAd })
  }

  const pubsub = new PubSub()

  module.exports = {
      pubsub,
      CREATE_AD,
      publishToDashboard
  }