const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PaymentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    password: {
      type: String,
      default: ''
    },
    facebookId: { type: String },
    appleId: { type: String },
    googleEmail: { type: String },
    confirmationCode: { type: String },
    showEmail: {
      type: Boolean,
      default: true
    },
    showPhone: {
      type: Boolean,
      default: true
    },
    countryCode:{
      type: String,
      default: 'PK'
    },
    callingCode:{
      type: String,
      default: '92'
    },
    description: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    notificationToken: {
      type: String
    },
    notifications: {
      type: [],
      default: []
    },
    isOfferNotification:{
      type: Boolean,
      default: false
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('PaymentType', PaymentTypeSchema)
module.exports = mongoose.model('User', userSchema)
