const { Expo } = require('expo-server-sdk')
const Item = require('../../models/item')
const Point = require('../../models/point')
const Address = require('../../models/address')
const User = require('../../models/user')
const Configuration = require('../../models/configuration')
const Zone = require('../../models/zone')
const uuid = require('uuid')

const { transformItem, populateItems, transformUser } = require('./merge')
const { sendNotificationMobile } = require('../../helpers/utilities')
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
        allItems: async (_, args, { req, res }) => {
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
                if (args.zone) {
                    items = await Item.find({
                        zone: args.zone,
                        status: { $eq: 'ACTIVE' },
                        isActive: true
                    })
                }
                else if (args.latitude && args.longitude) {
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
                        status: { $eq: 'ACTIVE' },
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
                let filters = {}
                let sort = {}
                if (args.subCategory) {
                    filters.status = { $eq: 'ACTIVE' }
                    filters.isActive = true
                    if (args.min || args.max) {
                        filters.price = { $gte: args.min, $lte: args.max }
                    }
                    if (args.condition) {
                        filters.condition = { $eq: args.condition }
                    }
                    switch (args.sort) {
                        case 'latest':
                            sort.createdAt = -1 
                            break;
                        case 'priceLow':
                            sort.price = 1
                            break;
                        case 'priceHigh':
                            sort.price = -1 
                            break;
                        default:
                            sort.createdAt = -1 
                            break
                    }
                    items = await Item.find({ subCategory: { $in: args.subCategory }, ...filters }).sort({ ...sort })
                } else {
                    items = await Item.find({ isActive: true, status: { $eq: 'ACTIVE' } })
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
                    user: context.req.userId,
                    status: { $ne: 'DELETE' }
                }

                const items = await Item.find({
                    ...filters,
                    isActive: true
                }).sort([['createdAt', -1]])
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
                    user: req.userId,
                    price: args.item.price,
                    address: address
                })
                const result = await item.save()
                const transformItems = await transformItem(result)
                publishToDashboard(transformItems, 'new')
                return transformItems
            } catch (error) {
                console.log('error',error)
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
        updateItemStatus: async (_, args, { req, res }) => {
            console.log("updateItemStatus")
            try {
                const item = await Item.findById(args.id)
                if (!item) throw new Error("Item not found")
                item.status = args.status
                const result = await item.save()
                if (!req.userId || (req.userId != result.user)) {
                    User.findById(result.user)
                        .then(user => {
                            if (!user.notifications) user.notifications = []
                            user.notifications.unshift({
                                _id: uuid.v4(),
                                order: result.itemId,
                                status: result.status,
                                message: `Your item#${result.itemId} status has been changed to ${result.status}`,
                                date: result.updatedAt
                              })
                              if (user.notifications.length > 10) {
                                user.notifications = user.notifications.slice(0, 10)
                              }
                              user.markModified('notifications')
                              user
                                .save()
                                .then(updatedUser => {
                                  console.log('user updated with notifications')
                                })
                                .catch(() => {
                                  console.log(
                                    'An error occured while updating user notifications'
                                  )
                                })
                            if (user.notificationToken) {
                                const messages = []
                                if (Expo.isExpoPushToken(user.notificationToken)) {
                                    console.log('valid token')
                                    messages.push({
                                        to: user.notificationToken,
                                        sound: 'default',
                                        body: 'Your AD ' + result.itemId + ' status updated to ' + result.status,
                                        channelId: 'default',
                                        data: {
                                            _id: result._id,
                                            item: result.itemId,
                                            status: result.status
                                        }
                                    })
                                    sendNotificationMobile(messages)
                                }
                            }
                        })
                        .catch(() => {
                            console.log('an error occured while sending notifications')
                        })
                }
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
                const item = await Item.findById(args.item)
                console.log('item', args.item)
                if (index < 0) {
                    user.likes.push(args.item)
                    item.likesCount = item.likesCount + 1
                } else {
                    user.likes.splice(index, 1)
                    item.likesCount = item.likesCount - 1
                }
                await user.save()
                await item.save()
                return transformUser(user)
            } catch (err) {
                throw err
            }
        }
    }
}