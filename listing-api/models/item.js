const mongoose = require('mongoose')
const { addressSchema } = require('./address')

const Schema = mongoose.Schema
const itemSchema = new Schema(
    {
        itemId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: 'SubCategory'
        },
        zone: {
            type: Schema.Types.ObjectId,
            ref: 'Zone',
            default: null
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        likesCount: {
            type: Number,
            default: 0
        } ,
        status: {
            type: String,
            default: "PENDING"
        },
        images: [String],
        address: {
            type: addressSchema
        },
        price: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)
itemSchema.index({ "address.location": "2dsphere" })
module.exports = mongoose.model('Item', itemSchema)