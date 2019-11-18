import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Layout from '../layout/default'
import { withContainer } from '../context'
import LINKSTORE from '../helper/link'
import hasPermission from '../helper/permissions.cli.util'
import Test from './page/zphutest'
import { Profile, Account, Category, Post, Gallery, Home, Product, ProductMaster, ChangePassword, Permission, Advertise, Slide, CategoryPost, Contact, ContactInfo, Producer } from './page'
const { ACCOUNTLINK, CATEGORYLINK, POSTLINK, GALLERYLINK, PRODUCTLINK, PRODUCTMASTERLINK, PERMISSIONLINK, ADVERTISELINK, SLIDELINK, CATEGORYPOSTLINK, CONTACTLINK, PRODUCERLINK } = LINKSTORE

class App extends React.PureComponent {
  constructor (props) {
    super(props)
    this.routes = [
      { key: 'main-cat', exact: true, path: '/', component: Home },
      { key: 'main-profile', path: ACCOUNTLINK.PROFILE, component: Profile },
      { key: 'main-change-password', path: ACCOUNTLINK.CHANGEPASSWORD, component: ChangePassword },
      { key: 'main-account', path: ACCOUNTLINK.GRID, component: Account, permission: ['ACCOUNTVIEW'] },
      { key: 'main-category', path: CATEGORYLINK.GRID, component: Category, permission: ['CATEGORYVIEW'] },
      { key: 'main-category-post', path: CATEGORYPOSTLINK.GRID, component: CategoryPost },
      { key: 'main-contact', path: CONTACTLINK.GRID, component: Contact },
      { key: 'main-contact-info', path: CONTACTLINK.CONTACTINFO, component: ContactInfo },
      { key: 'main-post', path: POSTLINK.GRID, component: Post },
      { key: 'main-ad', path: ADVERTISELINK.GRID, component: Advertise },
      { key: 'main-slide', path: SLIDELINK.GRID, component: Slide },
      { key: 'main-gallery', path: GALLERYLINK, component: Gallery },
      { key: 'main-product', path: PRODUCTLINK.GRID, component: Product },
      { key: 'main-product-master', path: PRODUCTMASTERLINK.GRID, component: ProductMaster },
      { key: 'main-producer', path: PRODUCERLINK.GRID, component: Producer },
      { key: 'main-permisison', path: PERMISSIONLINK.GRID, component: Permission },
      { key: 'main-zphu-test', path: '/zphutest', component: Test },
      { key: 'main-logout', path: '/logout', render: () => <Redirect to='/login' /> },
      { key: 'page-error', path: '/error', render: () => 'Page not found' }
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
                // if (!hasPermission(route.permission, this.props.currentUser)) return <Redirect key='error' to='/error' />
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
