const mongoose = require('mongoose')
const { pointSchema } = require('./point')

const Schema = mongoose.Schema
const addressSchema = new Schema(
  {
    location: {
      type: pointSchema
    },
    address: { type: String, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const myModule = (module.exports = mongoose.model('Address', addressSchema))
myModule.addressSchema = addressSchema