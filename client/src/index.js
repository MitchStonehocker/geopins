// src/index.js

import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Context from './Context'
import Reducer from './Reducer'

import App from './pages/App'
import Splash from './pages/Splash'

import 'mapbox-gl/dist/mapbox-gl.css'

const Root = () => {
  const initialState = useContext(Context)
  // console.log('>>>-index-Root-initialState->', initialState)
  const [state, dispatch] = useReducer(Reducer, initialState)
  console.log('>>>-index-Root-state->', state)

  return (
    <Router>
      <Context.Provider value={{ state, dispatch }}>
        <Switch>
          <Route component={App} exact path='/' />
          <Route component={Splash} exact path='/signin' />
        </Switch>
      </Context.Provider>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
