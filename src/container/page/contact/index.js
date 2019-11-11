import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'contact'

export default class Contact extends React.PureComponent {
  constructor (props) {
    super(props)
    const CONTACTLINK = LINK.CONTACTLINK
    this.state = {
      routes: [
        { key: 'contact-form', permissions: true, path: CONTACTLINK.EDIT, render: (props) => <FormWrapper {...props} /> },
        { key: 'contact-gridview', permissions: true, path: CONTACTLINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> }
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


