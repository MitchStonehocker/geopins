// src/components/pages/Splash.js

import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import SignIn from '../components/Auth/SignIn'
import Context from '../Context'

const Splash = () => {
  console.log('>>>-Splash->')
  const { state } = useContext(Context)
  console.log('>>>-Splash-state->', state)

  return state.isAuth ? <Redirect to='/' /> : <SignIn />
  // return <SignIn />
}

export default Splash
