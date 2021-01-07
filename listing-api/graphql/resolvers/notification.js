const { Expo } = require('expo-server-sdk')
const User = require('../../models/user')
const { sendNotificationMobile } = require('../../helpers/utilities')

module.exports = {
  Mutation: {
    sendNotificationUser: async(_, args, { req, res }) => {
      console.log('sendNotificationUser')
      try {
        const users = await User.find({ isActive: true })
        const messages = []
        users.forEach(async(user, i) => {
          if (user.notificationToken && user.isOfferNotification) {
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