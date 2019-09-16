import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from '../layout/default'
import { withContainer } from '../context'
import LINKSTORE from '../helper/link'
import hasPermission from '../helper/permissions.cli.util'
import { Profile, Account, Category, CategoryPost, Post, Gallery, Home, Product } from './page'
const { ACCOUNTLINK, CATEGORYLINK, CATEGORYPOSTLINK, POSTLINK, GALLERYLINK, PRODUCTLINK } = LINKSTORE

class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.routes = [
      { key: 'main-cat', exact: true, path: '/', component: Home },
      { key: 'main-profile', path: ACCOUNTLINK.PROFILE, component: Profile },
      { key: 'main-account', path: ACCOUNTLINK.GRID, component: Account, permission: ['ACCOUNTVIEW'] },
      { key: 'main-category', path: CATEGORYLINK.GRID, component: Category, permission: ['CATEGORYVIEW'] },
      { key: 'main-category-post', path: CATEGORYPOSTLINK.GRID, component: CategoryPost },
      { key: 'main-post', path: POSTLINK.GRID, component: Post },
      { key: 'main-gallery', path: GALLERYLINK, component: Gallery },
      { key: 'main-product', path: PRODUCTLINK, component: Product },
      { key: 'main-logout', path: '/logout', render: () => <Redirect to='/login' /> },
      { key: 'page-error', path: '/error', render: () => <>Page not found</> }
    ]
  }
  render () {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Switch>
              {this.routes.map(route => {
                if (!route.permission) return <Route {...route} />
                if (!hasPermission(route.permission, this.props.currentUser)) return <Redirect to='/error' />
                return <Route {...route} />
              })}
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    )
  }
}

export default withContainer(App, (c) => ({
  currentUser: c.data.currentUser
}))
