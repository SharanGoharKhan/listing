const Item = require('../../models/item')
const Point = require('../../models/point')
const Address = require('../../models/address')
const User = require('../../models/user')
const Configuration = require('../../models/configuration')
const Zone = require('../../models/zone')
const { transformItem, populateItems, transformUser } = require('./merge')
const { pubsub,
    publishToDashboard,
    CREATE_AD
} = require('../../helpers/pubsub')

module.exports = {
    Subscription: {
        subscribeCreateAd: {
            subscribe: () => pubsub.asyncIterator(CREATE_AD)
        },
    },
    Query: {
        allItems: async (_, args, context) => {
            console.log("allItems")
            try {

                const items = await Item.find({ isActive: true })
                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
        nearByItems: async (_, args, context) => {
            console.log("nearByItems", args)
            try {
                let items = []
                if (args.latitude && args.longitude) {
                    const location = new Point({
                        type: 'Point',
                        coordinates: [Number(args.longitude), Number(args.latitude)]
                    })
                    const zones = await Zone.find({
                        isActive: true,
                        location: {
                            $geoIntersects: { $geometry: location }
                        }
                    })
                    if (!zones.length) return []
                    items = await Item.find({
                        zone: { $in: [zones.map(z => z.id)] },
                        isActive: true
                    })
                } else if (args.zone) {
                    items = await Item.find({
                        zone: args.zone,
                        isActive: true
                    })
                }
                else {
                    return []
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
                                    coordinates: [args.long, args.lat]
                                }
                            }
                        },
                        subCategory: args.subCategory,
                        isActive: true

                    })
                } else if (args.subCategory) {
                    items = await Item.find({ isActive: true, subCategory: { $in: args.subCategory } })
                } else {
                    items = await Item.find({ isActive: true })
                }

                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
        itemsByUser: async (_, args, context) => {
            console.log("itemsByUser")
            try {
                let filters = {
                    user: context.req.userId
                }

                const items = await Item.find({
                    ...filters,
                    isActive: true
                })
                return items.map(transformItem)
            } catch (error) {
                throw error
            }
        },
        likes: async (_, args, { req, res }) => {
            console.log('likes')
            try {
                const user = await User.findById(req.userId)
                if (!user) throw new Error("User Unauthenticated")
                if (user.likes.length) return []
                return populateItems(user.likes)
            } catch (error) {
                console.log('likes error:', error)
                throw error
            }
        }
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
                    zone: args.item.zone,
                    images: args.item.images,
                    user: "5f9043a329ff207f691504c7",
                    price: args.item.price,
                    address: address
                })
                const result = await item.save()
                const transformItems = transformItem(result)
                publishToDashboard(transformItems, 'new')
                return transformItems
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
                const item = await Item.findById(args.item._id)
                item.title = args.item.title
                item.description = args.item.description
                item.condition = args.item.condition
                item.subCategory = args.item.subCategory
                item.zone = args.item.zone
                item.user = req.userId
                item.price = args.item.price
                item.address = address
                item.images = args.item.images
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
        },
        addToFavourites: async (_, args, { req, res }) => {
            console.log('addToFavourites')
            try {
                if (!req.isAuth) throw new Error('Unauthenticated')
                const user = await User.findById(req.userId)
                const index = user.likes.indexOf(args.item)
                if (index < 0) {
                    user.likes.push(args.item)
                } else {
                    user.likes.splice(index, 1)
                }
                await user.save()
                return transformUser(user)
            } catch (err) {
                throw err
            }
        }
    }
}