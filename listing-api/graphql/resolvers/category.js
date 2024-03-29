const Category = require('../../models/category')
const SubCategory = require('../../models/subCategory')
const { transformCategory } = require('./merge')
const Item = require('../../models/item')
module.exports = {
  Query: {
    categories: async(_, args, context) => {
      console.log('categories: ')
      try {
        const categories = await Category.find({ isActive: true }).sort('title')
        return categories.map(category => {
          return transformCategory(category)
        })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    createCategory: async(_, args, context) => {
      console.log('createCategory')
      try {
        const category = new Category({
          title: args.category.title,
          image: args.category.image
        })

        const result = await category.save()

        return { ...result._doc, _id: result.id }
      } catch (err) {
        throw err
      }
    },
    editCategory: async(_, args, context) => {
      console.log('editCategory')
      try {
        const category = await Category.findOne({ _id: args.category._id })

        category.title = args.category.title
        category.image = args.category.image

        const result = await category.save()

        return { ...result._doc, _id: result.id }
      } catch (err) {
        throw err
      }
    },
    deleteCategory: async(_, { id }, context) => {
      console.log('deleteCategory')
      try {
        const category = await Category.findById(id)
        const subCategories = await SubCategory.find({ category: id })
        subCategories.forEach(async item => {
          await Item.updateMany(
            { subCategory: item._id },
            { isActive: false }
          )
          await SubCategory.findOneAndUpdate(
            { _id: item._id },
            { isActive: false }
          )
        })

        category.isActive = false
        const result = await category.save()
        return { ...result._doc, _id: result.id }
      } catch (err) {
        throw err
      }
    }
  }
}