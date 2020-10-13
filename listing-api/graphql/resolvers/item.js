const Item = require('../../models/item')
const { transformItem } = require('./merge')

module.exports = {
    Query: {
        allItems: async (_, args, context) => {
            console.log("allItems")
            try {
                const items = await Item.find({
                    isActive: true
                })
                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
        itemsByCategory: async (_, args, context) => {
            console.log("itemsByCategory")
            try {
                const items = await Item.find({
                    subCategory: args.subCategory,
                    isActive: true
                })
                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
        itemsByUser: async (_, args, context) => {
            console.log("itemsByUser")
            try {
                const items = await Item.find({
                    user: args.user,
                    isActive: true
                })
                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
    },
    Mutation: {
        createItem: async (_, args, { req, res }) => {
            console.log("createItem")
            try {
                if (!req.userId) {
                    throw new Error("User Unauthenticated")
                }
                const item = new Item({
                    title: args.ItemInput.title,
                    description: args.ItemInput.description,
                    condition: args.ItemInput.condition,
                    subCategory: args.ItemInput.subCategory,
                    user: req.userId,
                    price: args.ItemInput.price,
                    address: args.ItemInput.address
                })
                const result = await item.save()
                return transformItem(result)
            } catch (error) {
                throw error
            }
        },
        editItem: async(_, args, { req, res }) =>{
            console.log("editItem")
            try {
                if (!req.userId) {
                    throw new Error("User Unauthenticated")
                }
                const item = await findById(args.ItemInput._id)
                item.title = args.ItemInput.title
                item.description = args.ItemInput.description
                item.condition = args.ItemInput.condition
                item.subCategory = args.ItemInput.subCategory
                item.user = req.userId
                item.price = args.ItemInput.price
                item.address = args.ItemInput.address
                item.images = args.ItemInput.images
                const result = await item.save()
                return transformItem(result)
            } catch (error) {
                throw error
            }
        }
    }
}