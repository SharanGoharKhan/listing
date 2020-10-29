const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const { checkPhoneAlreadyUsed, randomString } = require('../../helpers/utilities')
const sendEmail = require('../../helpers/email')
const { transformUser } = require('./merge')
const { signupTemplate, signupText, verificationTemplate, verificationText } = require('../../helpers/templates')

module.exports = {
  Query: {
    profile: async (_, args, { req, res }) => {
      console.log('profile')
      if (!req.isAuth) {
        throw new Error('Unauthenticated')
      }
      try {
        const user = await User.findById(req.userId)
        if (!user) throw new Error('User does not exist')
        return transformUser(user)
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    users: async (_, args, context) => {
      console.log('users')
      try {
        const users = await User.find({ isActive: true }).sort({
          createdAt: -1
        })
        if (!users || !users.length) return []
        // transform users
        return users.map(user => {
          return transformUser(user)
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    },
    userCount: async (_, args, contex) => {
      try {
        const userCount = await User.find({
          isActive: true
        }).countDocuments()
        return userCount
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    createUser: async (_, args, context) => {
      console.log('createUser', args.userInput)
      try {
        if (args.userInput.facebookId) {
          const existingfacebookId = await User.findOne({
            facebookId: args.userInput.facebookId
          })
          if (existingfacebookId) {
            throw new Error(
              'Facebook account is already registered. Please Login'
            )
          }
        }
        if (args.userInput.appleId) {
          const existingAppleId = await User.findOne({
            appleId: args.userInput.appleId
          })
          if (existingAppleId) {
            throw new Error('Apple account is already registered. Please Login')
          }
        }
        if (args.userInput.email) {
          const existingEmail = await User.findOne({
            email: args.userInput.email
          })
          if (existingEmail) {
            throw new Error('Email is already associated with another account.')
          }
        }
        if (args.userInput.phone) {
          const existingPhone = await User.findOne({
            phone: args.userInput.phone
          })
          if (existingPhone) {
            throw new Error('Phone is already associated with another account.')
          }
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
        const user = new User({
          appleId: args.userInput.appleId,
          facebookId: args.userInput.facebookId,
          email: args.userInput.email,
          password: hashedPassword,
          phone: args.userInput.phone,
          name: args.userInput.name,
          googleEmail: args.userInput.googleEmail,
          notificationToken: args.userInput.notificationToken
        })

        const result = await user.save()
        sendEmail(result.email, 'Account Creation', signupText, signupTemplate)
        const token = jwt.sign(
          {
            userId: result.id,
            email: result.email || result.facebookId || result.appleId
          },
          'somesupersecretkey'
        )
        console.log({
          ...result._doc,
          userId: result.id,
          token: token,
          tokenExpiration: 1
        })
        return {
          ...result._doc,
          userId: result.id,
          token: token,
          tokenExpiration: 1
        }
      } catch (err) {
        throw err
      }
    },
    checkUserEmail: async (_, args, { req, res }) => {
      console.log("checkUserEmail")
      const userExist = await User.findOne({ email: args.email })
      if (userExist) {
        const randomCode = randomString(4, "n")
        userExist.confirmationCode = randomCode
        await userExist.save()
        sendEmail(args.email, 'Verification Code', verificationText(randomCode), verificationTemplate(randomCode))
        return true
      } else {
        return false
      }
    },
    updateUser: async (_, args, { req, res }) => {
      console.log(args.updateUserInput)
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const user = await User.findById(req.userId)
      if (!user) throw new Error('Please logout and login again')
      // check if phone number is already associated with another account
      if (
        !(await checkPhoneAlreadyUsed(req.userId, args.updateUserInput.phone))
      ) {
        try {
          user.name = args.updateUserInput.name
          user.phone = args.updateUserInput.phone
          const result = await user.save()
          return transformUser(result)
        } catch (err) {
          console.log(err)
          throw err
        }
      } else {
        throw new Error(
          'Phone number is already associated with another account'
        )
      }
    },
    followUser: async (_, { followStatus, userId }, { req, res }) => {
      try {
        const user = await User.findById(req.userId)
        if (followStatus) {
          console.log("UnfollowUser")
          const index = user.following.findIndex(el => el === userId)
          user.following.splice(index, 1)
        } else {
          console.log("followUser")
          user.following.push(userId)
        }
        const result = await user.save()
      } catch (error) {
        throw error
      }
    }
  }
}
