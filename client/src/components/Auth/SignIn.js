// src/Auth/SignIn.js

import React from 'react'
// import { GraphQLClient } from 'graphql-request'
import { GoogleLogin } from 'react-google-login'

import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'

// import { BASE_URL } from '../../client'
// import Context from '../../Context'
// import { ME_QUERY } from '../../graphql/queries'

const SignIn = ({ classes }) => {
  const onSuccess = googleUser => {
    console.log('>>>-SignIn-googleUser->', googleUser)
  }

  return (
    <GoogleLogin
      clientId='610186872499-cjiuon55regoeoh8qmsermmi9s8o88uq.apps.googleusercontent.com'
      onSuccess={onSuccess}
    />
  )
}

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
