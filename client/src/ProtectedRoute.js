// src/ProtectedRoute.js

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Context from './Context'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(Context)
  console.log('>>>-ProtectedRoute-state->', state)

  return (
    <Route
      render={props =>
        !state.isAuth ? <Redirect to='/signin' /> : <Component {...props} />
      }
      {...rest}
    />
  )
}

export default ProtectedRoute
