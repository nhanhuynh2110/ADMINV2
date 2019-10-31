import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'post'
export default class Post extends React.PureComponent {
  constructor (props) {
    super(props)
    const STORELINK = LINK.POSTLINK
    this.state = {
      routes: [
        { key: 'post-gridview', permissions: true, path: STORELINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> },
        { key: 'post-form', permissions: true, path: STORELINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
      ]
    }
    this.getBaseUrl = this.getBaseUrl.bind(this)
  }

  getBaseUrl (widget = '/') {
    return widget
  }

  render () {
    return (
      <React.Fragment>
        {this.state.routes.map((route) => <Route {...route} />)}
      </React.Fragment>
    )
  }
}
