export const login = `
mutation Login($facebookId:String,$email:String,$password:String,$type:String!,$appleId:String,$name:String,$notificationToken:String){
    login(facebookId:$facebookId,email:$email,password:$password,type:$type,appleId:$appleId,name:$name,notificationToken:$notificationToken){
     userId
     token
     tokenExpiration
     name
     email
     phone
   }
}
`

export const categories = `query{
  categories{
    _id
    title
    image
  }
}`
export const subCategories = `query SubCategoriesById($id: String!){
  subCategoriesById(id:$id){
    _id
    title
    
  }
}`

export const profile = `
  query{
    profile{
        _id
        name
        phone
        email
        notificationToken
        showPhone
        countryCode
        callingCode
        googleEmail
        followers{
          _id
          name
        }
        following{
          _id
          name
        }
        likes{
          _id
          itemId
          images
          price
          subCategory{
            _id
            title
          }
        }
      }
  }`

  export const updateUser = `mutation UpdateUser($userInput:UserInput!){
    updateUser(userInput:$userInput){
      _id
      name
      phone
      email
      notificationToken
      showPhone
      countryCode
      callingCode
      googleEmail
      followers{
        _id
        name
      }
      following{
        _id
        name
      }
      likes{
        _id
        itemId
        images
        price
        subCategory{
          _id
          title
        }
      }
    }
  }`

  export const itemsByUser = `query{
    itemsByUser{
      _id
      itemId
      title
      description
      condition
      subCategory{
        _id
        title
      }
      status
      images
      price
      user{
        _id
        name
        phone
        showPhone
        callingCode
      }
      address{
        _id
        address
        location{
          coordinates
        }
      }
      createdAt
    }
  }`

  export const getConfiguration = `query Configuration{
    configuration{
      _id
      itemPrefix
      currency
      currencySymbol
    }
  }`