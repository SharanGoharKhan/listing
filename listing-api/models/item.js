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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            default:"PENDING"
        },
        images: [String],
        address: { addressSchema },
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
module.exports = mongoose.model('Item', itemSchema)