// src/Auth/SignIn.js

import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { GraphQLClient } from 'graphql-request'

// import Context from '../../Context'
// import { BASE_URL } from '../../client'
// import { ME_QUERY } from '../../graphql/queries'

import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

// >> STEP 2 - connect to server >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`

const SignIn = ({ classes }) => {
  console.log('>>>-SignIn->')
  const onSuccess = async googleUser => {
    // console.log('>>>-SignIn-onSuccess-googleUse->', googleUser)
    const idToken = googleUser.getAuthResponse().id_token
    console.log('>>>-SignIn-onSuccess-idToken->', idToken)
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: { authorization: idToken }
    })
    // console.log('>>>-SignIn-calling-NODEJS-client->', client)
    // console.log('>>>-SignIn-calling-NODEJS-ME_QUERY->', ME_QUERY)
    const data = await client.request(ME_QUERY)
    console.log('>>>-SignIn-onSuccess-data->', data)
  }

  return (
    <GoogleLogin
      clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
      onSuccess={onSuccess}
      isSignedIn
    />
  )
}
// << STEP 2 - connect to server <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// const SignIn = ({ classes }) => {
//   const onSuccess = async googleUser => {
//     console.log('>>>-SignIn-googleUser->', googleUser)

//     const idToken = googleUser.getAuthResponse().id_token
//     const client = new GraphQLClient('http://localhost:4000/graphql', {
//       headers: { authorization: idToken }
//     })

//     console.log('>>>-SignIn-calling- NODEJS-client->', client)
//     console.log('>>>-SignIn-calling- NODEJS-ME_QUERY->', ME_QUERY)
//     const data = await client.request(ME_QUERY)
//     console.log('>>>-SignIn-onSuccess-data->', data)
//   }

//   return (
//     <GoogleLogin
//       clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
//       onSuccess={onSuccess}
//       isSignedIn
//     />
//   )
// }

// const SignIn = ({ classes }) => {
//   const { dispatch } = useContext(Context)
//   // console.log('>>>-SignIn-dispatch->', dispatch)

//   const onSuccess = async googleUser => {
//     try {
//       // console.log('>>>-SignIn-onSuccess-googleUser->', googleUser)
//       const idToken = googleUser.getAuthResponse().id_token
//       // console.log('>>>-SignIn-onSuccess-idToken->', idToken)
//       const client = new GraphQLClient(BASE_URL, {
//         headers: { authorization: idToken }
//       })
//       const { me } = await client.request(ME_QUERY)
//       // console.log('>>>-SignIn-onSuccess-me->', me)
//       dispatch({ type: 'SIGN_IN_USER', payload: me })
//       dispatch({ type: 'IS_SIGNED_IN', payload: googleUser.isSignedIn() })
//     } catch (err) {
//       onFailure(err)
//     }
//   }

//   const onFailure = err => {
//     console.log('>>>-SignIn-onFailure->', err)
//   }

//   return (
//     <div className={classes.root}>
//       <Typography
//         component='h3'
//         variant='h5'
//         gutterBottom
//         noWrap
//         style={{ color: 'rgb(66,133,224' }}
//       >
//         Welcome to
//       </Typography>
//       <Typography
//         component='h1'
//         variant='h3'
//         gutterBottom
//         noWrap
//         style={{ color: 'rgb(66,133,224' }}
//       >
//         GeoPins
//       </Typography>
//       <GoogleLogin
//         clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         isSignedIn
//         theme='dark'
//       />
//     </div>
//   )
// }

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
}

export default withStyles(styles)(SignIn)

// STEP-BY-STEP

// >> STEP 1 - connect to Google >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// import React from 'react'
// import { GoogleLogin } from 'react-google-login'
// import { withStyles } from '@material-ui/core/styles'
// const SignIn = ({ classes }) => {
//   console.log('>>>-SignIn->')
//   const onSuccess = googleUser => {
//     // console.log('>>>-SignIn-onSuccess-googleUse->', googleUser)
//     const idToken = googleUser.getAuthResponse().id_token
//     console.log('>>>-SignIn-onSuccess-idToken->', idToken)
//   }

//   return (
//     <GoogleLogin
//       clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
//       onSuccess={onSuccess}
//       isSignedIn
//     />
//   )
// }
// << STEP 1 - connect to Google <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
