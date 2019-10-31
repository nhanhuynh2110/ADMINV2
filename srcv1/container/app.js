import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { subscribe } from '../core'
import {MainBasic} from '../component/layout'
import routerLink from './routerLink'

const App = ({data}) => {
  return <Router>
    <MainBasic user={data.user} menu={data.menu}>
      <Switch>{routerLink().map(el => <Route {...el} />)}</Switch>
    </MainBasic>
  </Router>
}

export default subscribe({user: {}, menu: []})(App)
