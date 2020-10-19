const Item = require('../../models/item')
const Point = require('../../models/point')
const Address = require('../../models/address')
const Configuration = require('../../models/configuration')
const { transformItem } = require('./merge')
const Geo = require('geo-nearby');

module.exports = {
    Query: {
        allItems: async (_, args, context) => {
            console.log("allItems")
            try {
                let items = []
                if (args.lat && args.long) {
                    items = await Item.find({
                        "address.location": {
                            $near: {
                                $maxDistance: 5000,
                                $geometry: {
                                    type: "Point",
                                    coordinates: [33.700093, 72.973707]
                                }
                            }
                        },
                        isActive: true
                    })
                } else{
                    items = await Item.find()
                }

                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
        itemsByCategory: async (_, args, context) => {
            console.log("itemsByCategory")
            try {
                let items = []
                if (args.lat && args.long) {
                    items = await Item.find({
                        "address.location": {
                            $near: {
                                $maxDistance: 5000,
                                $geometry: {
                                    type: "Point",
                                    coordinates: [33.700093, 72.973707]
                                }
                            }
                        },
                        subCategory: args.subCategory,
                        isActive: true

                    })
                } else{
                    items = await Item.find()
                }

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
                const location = new Point({
                    type: 'Point',
                    coordinates: [
                        Number(args.item.address.longitude),
                        Number(args.item.address.latitude)
                    ]
                })
                let configuration = await Configuration.findOne()
                if (!configuration) {
                    configuration = new Configuration()
                    await configuration.save()
                }
                const itemId =
                    configuration.itemPrefix + (Number(configuration.itemId) + 1)
                configuration.itemId = Number(configuration.itemId) + 1
                await configuration.save()
                const address = new Address({
                    location: location,
                    address: args.item.address.address
                })
                const item = new Item({
                    itemId: itemId,
                    title: args.item.title,
                    description: args.item.description,
                    condition: args.item.condition,
                    subCategory: args.item.subCategory,
                    images: args.item.images,
                    user: req.userId,
                    price: args.item.price,
                    address: address
                })
                const result = await item.save()
                return transformItem(result)
            } catch (error) {
                throw error
            }
        },
        editItem: async (_, args, { req, res }) => {
            console.log("editItem")
            try {
                if (!req.userId) {
                    throw new Error("User Unauthenticated")
                }
                const location = new Point({
                    type: 'Point',
                    coordinates: [
                        Number(args.item.address.longitude),
                        Number(args.item.address.latitude)
                    ]
                })
                const address = new Address({
                    location: location,
                    address: args.item.address.address
                })
                const item = await Item.findById(args.ItemInput._id)
                item.title = args.ItemInput.title
                item.description = args.ItemInput.description
                item.condition = args.ItemInput.condition
                item.subCategory = args.ItemInput.subCategory
                item.user = req.userId
                item.price = args.ItemInput.price
                item.address = address
                item.images = args.ItemInput.images
                const result = await item.save()
                return transformItem(result)
            } catch (error) {
                throw error
            }
        },
        updateOrderStatus: async (_, args, context) => {
            console.log("updateOrderStatus")
            try {
                const item = await Item.findById(args.id)
                if (!item) throw new Error("Item not found")
                item.status = args.status
                const result = await item.save()
                return transformItem(result)
            } catch (error) {
                throw error
            }
        }
    }
}