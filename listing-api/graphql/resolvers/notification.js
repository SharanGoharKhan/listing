const { Expo } = require('expo-server-sdk')
const User = require('../../models/user')
const { sendNotificationMobile } = require('../../helpers/utilities')
const uuid = require('uuid')

module.exports = {
  Mutation: {
    sendNotificationUser: async (_, args, { req, res }) => {
      console.log('sendNotificationUser')
      try {
        const users = await User.find({ isActive: true })
        const messages = []
        users.forEach(async (user, i) => {
          if (user.notificationToken && user.isOfferNotification) {
            user.notifications.unshift({
              _id: uuid.v4(),
              order: '',
              status: '',
              message: args.notificationBody,
              date: new Date()
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
            if (Expo.isExpoPushToken(user.notificationToken)) {
              messages.push({
                to: user.notificationToken,
                sound: 'default',
                body: args.notificationBody,
                title: args.notificationTitle,
                channelId: 'default',
                data: {}
              })
            }
          }
        })
        await sendNotificationMobile(messages)
        return 'Success'
      } catch (e) {
        console.log(e)
      }
    }
  }
}