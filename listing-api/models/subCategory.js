const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subCategoryySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('SubCategory', subCategoryySchema)