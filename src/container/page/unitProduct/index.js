import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'unitProduct'

export default class UnitProduct extends React.PureComponent {
  constructor (props) {
    super(props)
    const UNITPRODUCTLINK = LINK.UNITPRODUCTLINK
    this.state = {
      routes: [
        { key: 'unit-product-form', permissions: true, path: UNITPRODUCTLINK.EDIT, render: (props) => <FormWrapper {...props} /> },
        { key: 'unit-product-gridview', permissions: true, path: UNITPRODUCTLINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> }
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


