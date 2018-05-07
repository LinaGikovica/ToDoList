import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'

export const fakeAuth = {
  isAuthenticated: false,
  authenticate() {
    this.isAuthenticated = true
  },
  signout() {
    this.isAuthenticated = false
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)