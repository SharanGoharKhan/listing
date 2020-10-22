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

export const profile = `
  query{
    profile{
        _id
        name
        phone
        email
        notificationToken
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