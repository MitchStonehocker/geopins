// resolvers.js

const { AuthenticationError, PubSub } = require('apollo-server')
const Pin = require('./models/Pin')

// const user = {
//   _id: '1',
//   name: 'Mitch',
//   email: 'mitchderivado@yahoo.com',
//   picture: 'https://cloudinary.com/asdf'
// }

const pubSub = new PubSub()
const PIN_ADDED = 'PIN_ADDED'
const PIN_DELETED = 'PIN_DELETED'
const PIN_UPDATED = 'PIN_UPDATED'

const authenticated = next => (root, args, ctx, info) => {
  // console.log('>>>-resolvers-authenticated-ctx->', ctx)
  // console.log('>>>-resolvers-authenticated-ctx->', ctx.currentUser)

  if (!ctx.currentUser) {
    throw new AuthenticationError('You must be signed in!')
  }
  return next(root, args, ctx, info)
}

module.exports = {
  Query: {
    me: authenticated((root, args, ctx, info) => ctx.currentUser),
    getPins: async (root, args, ctx, info) => {
      const pins = await Pin.find({})
        .populate('author')
        .populate('comments.author')
      return pins
    }
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx, info) => {
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save()
      const pinAdded = await Pin.populate(newPin, 'author')
      pubSub.publish('PIN_ADDED', { pinAdded })
      return pinAdded
    }),
    deletePin: authenticated(async (root, args, ctx, info) => {
      const pinDeleted = await Pin.findOneAndDelete({ _id: args.pinId }).exec()
      pubSub.publish('PIN_DELETED', { pinDeleted })
      return pinDeleted
    }),
    createComment: authenticated(async (root, args, ctx, info) => {
      const newComment = { text: args.text, author: ctx.currentUser._id }
      const pinUpdated = await Pin.findOneAndUpdate(
        { _id: args.pinId },
        { $push: { comments: newComment } },
        { new: true }
      )
        .populate('author')
        .populate('comments.author')
      pubSub.publish('PIN_UPDATED', { pinUpdated })
      return pinUpdated
    })
  },
  Subscription: {
    pinAdded: {
      subscripe: () => pubSub.asynchIterator(PIN_ADDED)
    },
    pinDeleted: {
      subscripe: () => pubSub.asynchIterator(PIN_DELETED)
    },
    pinUpdated: {
      subscripe: () => pubSub.asynchIterator(PIN_UPDATED)
    }
  }
}
