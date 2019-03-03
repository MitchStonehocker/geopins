// src/graphql/queries.js

export const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`

export const GET_PINS_QUERY = `
{
  getPins {
    -id
    createdAt
    title
    image
    content
    latitude
    lognitude
    author {
      -id
      name
      email
      picture
    }
    comments {
      text
      createdAt
      author {
        _id
        name
        picture
      }
    }
  }
}
`
