import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from '../layout/default'
import { withContainer } from '../context'

import { ACCOUNT, CATEGORYLINK, CATEGORYPOSTLINK, BANNERLINK, PARTNERLINK, VIDEOLINK } from '../helper/link'
import { Profile, Category, CategoryPost, Banner, Partner, Product, Home, Video } from './page'

class App extends React.PureComponent {
  renderCategory ({ match }) {
    return <Category query={match} />
  }

  render () {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path={ACCOUNT.PROFILE} component={Profile} />
              <Route path={CATEGORYLINK.GRID} component={Category} />
              <Route path={CATEGORYPOSTLINK.GRID} component={CategoryPost} />
              <Route path={CATEGORYLINK.GRID + '/:code'} exact component={Category} />
              <Route path={BANNERLINK.GRID} component={Banner} />
              <Route path={PARTNERLINK.GRID} component={Partner} />
              <Route path={VIDEOLINK.GRID} component={Video} />
              <Route path='/product' component={Product} />
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    )
  }

  componentDidMount () {
    // require('../helper/tinyMCE').init1()
  }
}

export default withContainer(App, (c) => ({
  data: c.data
}))
