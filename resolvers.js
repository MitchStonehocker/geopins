// resolvers.js

const user = {
  _id: '1',
  name: 'Mitch',
  email: 'mitchderivado@yahoo.com',
  picture: 'https://cloudinary.com/asdf'
}

module.exports = {
  Query: {
    me: () => user
  }
}
