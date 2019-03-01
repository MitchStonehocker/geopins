// typeDefs.js

const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitudte: Float
    author: User
    comments: [Comment]
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  type Query {
    me: User
    getPins: [Pin!]
  }

  input CreatePinInput {
    title: String
    image: String
    content: String
    latitude: Float
    longitudte: Float
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
  }
`