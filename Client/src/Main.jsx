import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { PrivateRoute } from './Auth'
import Tasks from './Tasks'
import Users from './Users'
import Login from './Login'
import NewTask from './NewTask';

class Main extends Component {
  render() {
    return (
      <div>
      <Switch>
        <PrivateRoute path='/tasks/new' component={NewTask}/>
        <PrivateRoute path='/tasks' component={Tasks} />
        <PrivateRoute path='/users' component={Users} />
        <Route path='/login' component={Login} />
        <Redirect from="/" to="/tasks" />
      </Switch>
      </div>
    )
  }
}

export default Main;