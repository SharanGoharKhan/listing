const mongoose = require('mongoose')

const Schema = mongoose.Schema

const configurationSchema = new Schema(
  {
    itemId: {
      type: Number,
      default: 1,
      required: true
    },
    itemPrefix: {
      type: String,
      default: 'olx-'
    },
    pushToken: {
      type: String
    },
    mongodbUrl: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    enableEmail: {
      type: Boolean
    },
    currency: {
      type: String
    },
    currencySymbol: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Configuration', configurationSchema)
