import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'productMaster'

export default class ProductMaster extends React.PureComponent {
  constructor (props) {
    super(props)
    const STORELINK = LINK.PRODUCTMASTERLINK
    this.state = {
      routes: [
        { key: 'product-master-gridview', path: STORELINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> },
        { key: 'product-master-form', path: STORELINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
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
