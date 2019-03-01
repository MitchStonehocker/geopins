// server.js

const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

require('dotenv').config()
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
// const { findOrCreateUser } = require('./controllers/userController')

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongooseDB connected!'))
  .catch(err => console.error('>>>-server-err->', err))

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
