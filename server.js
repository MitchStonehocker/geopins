// server.js

const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

require('dotenv').config()
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { findOrCreateUser } = require('./controllers/userController')

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongooseDB connected!'))
  .catch(err => console.error('>>>-server-err->', err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // console.log('>>>-context-req.headers->', req)
    // console.log('>>>-context-req.headers->', req.headers)
    // console.log(
    //   '>>>-context-req.headers.authorization->',
    //   req.headers.authorization
    // )
    let authToken = null
    let currentUser = null
    try {
      const authToken = req.headers.authorization
      console.log('>>>-Server-authToken->', authToken)
      if (authToken) {
        // find user or create user
        currentUser = await findOrCreateUser(authToken)
        console.log('>>>-Server-currentUser->', currentUser)
      }
    } catch (err) {
      console.error(`Unabel to authenticate user with token ${authToken}`)
    }
    console.log('>>>-Server-currentUser->', currentUser)
    return { currentUser }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
