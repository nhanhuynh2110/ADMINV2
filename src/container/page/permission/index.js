import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'permission'

export default class Permission extends React.PureComponent {
  constructor (props) {
    super(props)
    const STORELINK = LINK.PERMISSIONLINK
    this.state = {
      routes: [
        { key: 'permission-gridview', permissions: ['PERMISSIONVIEW'], path: STORELINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> },
        { key: 'permission-form', permissions: ['PERMISSIONEDIT'], path: STORELINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
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
