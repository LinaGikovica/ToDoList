import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Tasks from './Tasks.jsx'
import Users from './Users.jsx'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path='/tasks' component={Tasks} />
        <Route path='/users' component={Users} />
      </Switch>
    )
  }
}

export default Main;