// resolvers.js

const { AuthenticationError } = require('apollo-server')
const Pin = require('./models/Pin')

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
    me: authenticated((root, args, ctx, info) => ctx.currentUser)
  },
  Mutation: {
    createPin: authenticated(async (root, args, ctx, info) => {
      // console.log('>>>-server-resolvers-args->', args)
      // console.log('>>>-server-resolvers-ctx->', ctx)
      const newPin = await new Pin({
        ...args.input,
        author: ctx.currentUser._id
      }).save()
      // console.log('>>>-server-resolvers-newPin->', newPin)
      const pinAdded = await Pin.populate(newPin, 'author')
      // console.log('>>>-server-resolvers-pinAdded->', pinAdded)

      return pinAdded
    })
  }
}

// module.exports = {
//   Query: {
//     me: authenticated((root, args, ctx, info) => ctx.currentUser),
//     getPins: (root, args, ctx, info) => {
//       const pins = await Pin.find({})
//         .populate('author')
//         .populate('comments.author')
//       return pins
//     }
//   },
//   Mutation: {
//     createPin: authenticated(async (root, args, ctx, info) => {
//       const newPin = await new Pin({
//         ...args.input,
//         author: ctx.currentUser._id
//       }).save()
//       const pinAdded = await Pin.populate(newPin, 'author')
//
//       console.log('>>>-server-resolvers-mutation->', args)
//
//       return pinAdded
//     })
//   }
// }

// const user = {
//   _id: '1',
//   name: 'Mitch',
//   email: 'mitchderivado@yahoo.com',
//   picture: 'https://cloudinary.com/asdf'
// }
