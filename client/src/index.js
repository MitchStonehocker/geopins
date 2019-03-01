import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './pages/App'
import Splash from './pages/Splash'

import 'mapbox-gl/dist/mapbox-gl.css'

const Root = () => {
  console.log('>>>-index-Root->')
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/signin' component={Splash} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
