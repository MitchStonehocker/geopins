// src/index.js

import React, { useContext, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

import ProtectedRoute from './ProtectedRoute'
import Context from './Context'
import Reducer from './Reducer'

import App from './pages/App'
import Splash from './pages/Splash'

import 'mapbox-gl/dist/mapbox-gl.css'

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  }
})

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
})

const Root = () => {
  // console.log('>>>-index-Root-Context->', Context)
  const initialState = useContext(Context)
  // console.log('>>>-index-Root-initialState->', initialState)
  const [state, dispatch] = useReducer(Reducer, initialState)
  console.log('>>>-index-Root-state->', state)

  return (
    <Router>
      <ApolloProvider client={client}>
        <Context.Provider value={{ state, dispatch }}>
          <Switch>
            <ProtectedRoute component={App} exact path='/' />
            <Route component={Splash} exact path='/signin' />
          </Switch>
        </Context.Provider>
      </ApolloProvider>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
