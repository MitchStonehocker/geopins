// src/Auth/SignIn.js

import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login'
import { GraphQLClient } from 'graphql-request'

import Context from '../../Context'
import { BASE_URL } from '../../client'
import { ME_QUERY } from '../../graphql/queries'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const SignIn = ({ classes }) => {
  console.log('>>>-SignIn->')
  const { dispatch } = useContext(Context)
  console.log('>>>-SignIn-dispatch->', dispatch)

  const onSuccess = async googleUser => {
    try {
      // console.log('>>>-SignIn-onSuccess-googleUse->', googleUser)
      const idToken = googleUser.getAuthResponse().id_token
      // console.log('>>>-SignIn-onSuccess-idToken->', idToken)
      // const client = new useClient()
      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      })
      // console.log('>>>-SignIn-calling-NODEJS-client->', client)
      // console.log('>>>-SignIn-calling-NODEJS-ME_QUERY->', ME_QUERY)
      const { me } = await client.request(ME_QUERY)
      console.log('>>>-SignIn-onSuccess-data->', me)
      dispatch({ type: 'SIGN_IN_USER', payload: me })
      dispatch({ type: 'IS_SIGNED_IN', payload: googleUser.isSignedIn() })
    } catch (err) {
      onFailure(err)
      // add to to test if server is up ? retry : start server and retry
    }
  }

  const onFailure = err => {
    console.log('>>>-SignIn-onFailure-error->', err)
  }

  return (
    <div className={classes.root}>
      <Typography
        component='h4'
        variant='h6'
        gutterBottom
        noWrap
        style={{ color: 'rgb(66,133,244)' }}
      >
        Welcome to GeoPins
      </Typography>
      <GoogleLogin
        clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn
        // buttonText='Use Google to Sign In...'
        theme='dark'
      />
    </div>
  )
}

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

//
// STEP-BY-STEP
//
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
//
//   return (
//     <GoogleLogin
//       clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
//       onSuccess={onSuccess}
//       isSignedIn
//     />
//   )
// }
// << STEP 1 - connect to Google <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >> STEP 2 - connect to server >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// import React from 'react'
// import { GoogleLogin } from 'react-google-login'
// import { GraphQLClient } from 'graphql-request'
// import { withStyles } from '@material-ui/core/styles'
// const ME_QUERY = `
// {
//   me {
//     _id
//     name
//     email
//     picture
//   }
// }
// `
//
// const SignIn = ({ classes }) => {
//   console.log('>>>-SignIn->')
//   const onSuccess = async googleUser => {
//     // console.log('>>>-SignIn-onSuccess-googleUse->', googleUser)
//     const idToken = googleUser.getAuthResponse().id_token
//     console.log('>>>-SignIn-onSuccess-idToken->', idToken)
//     const client = new GraphQLClient('http://localhost:4000/graphql', {
//       headers: { authorization: idToken }
//     })
//     // console.log('>>>-SignIn-calling-NODEJS-client->', client)
//     // console.log('>>>-SignIn-calling-NODEJS-ME_QUERY->', ME_QUERY)
//     const data = await client.request(ME_QUERY)
//     console.log('>>>-SignIn-onSuccess-data->', data)
//   }
//
//   return (
//     <GoogleLogin
//       clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
//       onSuccess={onSuccess}
//       isSignedIn
//     />
//   )
// }
// << STEP 2 - connect to server <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// >> STEP 3 - add store/context >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// move ME_QUERY to src/graphql/queries.js
// move ulr to BASE_URL in src/client
//
// import React, { useContext } from 'react'
// import { GoogleLogin } from 'react-google-login'
// import { GraphQLClient } from 'graphql-request'
//
// import Context from '../../Context'
// import { BASE_URL } from '../../client'
// import { ME_QUERY } from '../../graphql/queries'
//
// import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'
// const SignIn = ({ classes }) => {
//   console.log('>>>-SignIn->')
//   const { dispatch } = useContext(Context)
//   console.log('>>>-SignIn-dispatch->', dispatch)
//
//   const onSuccess = async googleUser => {
//     try {
//       // console.log('>>>-SignIn-onSuccess-googleUse->', googleUser)
//       const idToken = googleUser.getAuthResponse().id_token
//       // console.log('>>>-SignIn-onSuccess-idToken->', idToken)
//       const client = new GraphQLClient(BASE_URL, {
//         headers: { authorization: idToken }
//       })
//       // console.log('>>>-SignIn-calling-NODEJS-client->', client)
//       // console.log('>>>-SignIn-calling-NODEJS-ME_QUERY->', ME_QUERY)
//       const { me } = await client.request(ME_QUERY)
//       console.log('>>>-SignIn-onSuccess-data->', me)
//       dispatch({ type: 'SIGN_IN_USER', payload: me })
//       dispatch({ type: 'IS_SIGNED_IN', payload: googleUser.isSignedIn() })
//     } catch (err) {
//       onFailure(err)
//     }
//   }
//
//   const onFailure = err => {
//     console.log('>>>-SignIn-onFailure-error->', err)
//   }
//
//   return (
//     <div className={classes.root}>
//       <Typography
//         component='h4'
//         variant='h6'
//         gutterBottom
//         noWrap
//         style={{ color: 'rgb(66,133,244)' }}
//       >
//         Welcome to GeoPins
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
// << STEP 3 - add store/context <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
