const { gql } = require('apollo-server-express')

const typeDefs = gql`
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
    name: String
    phone: String
    email: String
    notificationToken: String
}
type Admin {
    userId: String!
    email: String!
    name: String!
    token: String!
}
type User {
    _id: ID
    name: String
    phone: String
    email: String
    password: String
    isActive: Boolean
    createdAt: String
    updatedAt: String
    notificationToken: String
    googleEmail: String
    followers: [User]
    following: [User]
    likes: [Item]
    showEmail: Boolean
    showPhone: Boolean
    countryCode: String
    callingCode: String
    description: String
}
type Configuration {
  _id: String!
  itemPrefix: String
  pushToken: String
  email: String
  password: String
  enableEmail: Boolean
  currency: String
  currencySymbol: String
}
  type ForgotPassword {
    result: Boolean!
  }
  type Item {
    _id: ID!
    itemId: String!
    title: String!
    description: String
    condition: String!
    subCategory: SubCategory!
    zone: Zone!
    status: String!
    likesCount: Float
    images: [String]
    price: Float!
    user: User!
    address: Address!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Address {
    _id: ID!
    location: Point
    address: String!
  }

  type Point {
    coordinates: [String!]
  }

  type SubCategory {
    _id: ID
    title: String!
    category: Category!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    _id: ID
    title: String!
    image: String!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type SubscriptionCreateAd {
    item: Item!
    origin: String!
  }

  type Polygon {
    coordinates: [[[Float!]]]
  }

  type Zone {
    _id: String!
    title: String!
    description: String!
    location: Polygon
    isActive: Boolean!
  }

  input UserInput {
    phone: String
    email: String
    password: String
    description: String
    showPhone: Boolean
    countryCode: String
    callingCode: String
    name: String
    facebookId: String
    notificationToken: String
    appleId: String
    googleEmail: String
  }

  input CategoryInput {
    _id: String
    title: String!
    image: String!
  }

  input SubCategoryInput {
    _id: String
    title: String!
    category: String!
  }

  input ItemInput {
    _id: String
    title: String!
    description: String!
    condition: String!
    subCategory: String!
    zone: String!
    status: String
    images: [String]
    price: Float!
    user: String!
    address: AddressInput!
  }

  input AddressInput {
    _id: String
    longitude: String!
    latitude: String!
    address: String!
  }

  input OrderConfigurationInput {
    itemPrefix: String!
  }
  input EmailConfigurationInput {
    email: String!
    password: String!
    enableEmail: Boolean!
  }
  input MongoConfigurationInput {
    mongodbUrl: String!
  }
  input CurrencyConfigurationInput {
    currency: String!
    currencySymbol: String!
  }

  input ZoneInput {
    _id: String
    title: String!
    description: String!
    coordinates: [[[Float!]]]
  }


  type Query {  
    profile: User
    users(page: Int): [User!]
    user(id: String!): User!
    userCount: Int!
    categories: [Category!]!
    subCategories: [SubCategory!]!
    subCategoriesById(id: String!): [SubCategory!]!
    configuration: Configuration!
    nearByItems(latitude: Float,longitude: Float, zone: String): [Item!]
    allItems: [Item!]
    itemsByCategory(subCategory: [String!]): [Item!]
    itemsByUser: [Item!]
    zones: [Zone!]
    zone(id: String!): Zone!
    likes:[Item!]
  }

  type Mutation {
    login(
        appleId: String
        facebookId: String
        email: String
        password: String
        type: String!
        name: String
        notificationToken: String
      ): AuthData!
    adminLogin(email: String!, password: String!): Admin!
    createUser(userInput: UserInput): AuthData!
    checkUserEmail(email: String!): Boolean
    updateUser(userInput: UserInput!): User!
    followUser(followStatus:Boolean!, userId: String!): User!
    forgotPassword(email: String!): ForgotPassword!
    resetPassword(password: String!, token: String!): ForgotPassword!
    createCategory(category: CategoryInput!): Category!
    editCategory(category: CategoryInput!): Category!
    createSubCategory(subCategory: SubCategoryInput!): SubCategory!
    editSubCategory(subCategory: SubCategoryInput!): SubCategory!
    deleteCategory(id: String!): Category!
    deleteSubCategory(id: String!): SubCategory!
    createItem(item: ItemInput!): Item!
    editItem(item: ItemInput!): Item!
    addToFavourites(item: String): User!
    updateOrderStatus(id: String!, status: String!): Item!
    pushToken(token: String): User!
    changePassword(oldPassword: String!, newPassword: String!): Boolean!
    checkVerificationCode(email: String!, verificationCode: String!): AuthData!
    saveOrderConfiguration(
      configurationInput: OrderConfigurationInput!
    ): Configuration!
    saveEmailConfiguration(
      configurationInput: EmailConfigurationInput!
    ): Configuration!
    saveMongoConfiguration(
      configurationInput: MongoConfigurationInput!
    ): Configuration!
    saveCurrencyConfiguration(
      configurationInput: CurrencyConfigurationInput!
    ): Configuration!
    uploadToken(pushToken: String!): Configuration!
    createZone(zone: ZoneInput!): Zone!
    editZone(zone: ZoneInput!): Zone!
    deleteZone(id: String!): Zone!
  }
  type Subscription {
    subscribeCreateAd: SubscriptionCreateAd!
  }
`
module.exports = typeDefs
