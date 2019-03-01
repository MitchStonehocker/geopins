// controllers/userControllers.js

const User = require('../models/User')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

exports.findOrCreateUser = async token => {
  //   console.log('>>>-userController-findOrCreateUser-token->', token)
  // verify auth token
  const googleUser = await verifyAuthToken(token)
  // check if user exists: if user exists return
  const user = await checkIfUserExists(googleUser.email)
  // if user doesn't exist create
  return user || createNewUser(googleUser)
}

const verifyAuthToken = async token => {
  //   console.log('>>>-userController-verifyAuthToken-token->', token)
  try {
    // console.log('>>>-userController-verifyAuthToken-client->', client)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.OAUTH_CLIENT_ID
    })
    // console.log('>>>-userController-verifyAuthToken-ticket->', ticket.payload)
    // return ticket.getPayLoad()
    return ticket.payload
  } catch (err) {
    console.error('Error verifying auth token', err)
  }
}

const checkIfUserExists = async email => await User.findOne({ email }).exec()
// .exec() returns a promise

const createNewUser = googleUser => {
  const { name, email, picture } = googleUser
  const user = { name, email, picture }
  return new User(user).save()
  // .save() save to db
}
