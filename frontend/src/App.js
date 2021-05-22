import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './screens/Home'
import Profile from './screens/Profile'
import Tasks from './screens/Tasks'

function App() {
  return (
    <Router>
      <Route path="/" component={Home} exact />
      <Route path="/user/profile" component={Profile} exact />
      <Route path="/user/mytasks" component={Tasks} exact />
    </Router>
  )
}

export default App
