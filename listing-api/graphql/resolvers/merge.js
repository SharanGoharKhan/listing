const User = require('../../models/user')
const Category = require('../../models/category')
const SubCategory = require('../../models/subCategory')
// const { dateToString } = require('../../helpers/date')

const user = async userId => {
  try {
    const user = await User.findById(userId.toString())
    return {
      ...user._doc,
      _id: user.id
    }
  } catch (err) {
    throw err
  }
}

const subCategory = async subCategory => {
  try {
    const result = await SubCategory.findOne({ _id: subCategory })
    return {
      ...result._doc,
      _id: result.id,
      category: populateCategory.bind(this, result.category)
    }
  } catch (err) {
    throw err
  }
}


const transformCategory = category => {
  return {
    ...category._doc,
    _id: category.id
  }
}


const transformUser = async user => {
  console.log('user', user)
  return {
    ...user._doc,
    password: null,
    _id: user.id,
    addresses: populateAddresses.bind(this, user.addresses),
    whishlist: products.bind(this, user.whishlist)
  }
}



const populateCategory = async categoryId => {
  const category = await Category.findById(categoryId)
  return transformCategory(category)
}

const transformSubCategory = async subCategory => {
  return {
    ...subCategory._doc,
    _id: subCategory.id,
    category: populateCategory.bind(this, subCategory.category)
  }
}

const transformItem = async (item) => {
  return {
    ...item._doc,
    _id: item.id,
    subCategory: subCategory.bind(this, item.subCategory),
    user: user.bind(this, item.user)
  }
}

exports.transformSubCategory = transformSubCategory
exports.transformCategory = transformCategory
exports.transformUser = transformUser
exports.transformItem = transformItem
