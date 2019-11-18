import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'producer'

export default class Producer extends React.PureComponent {
  constructor (props) {
    super(props)
    const PRODUCERLINK = LINK.PRODUCERLINK
    this.state = {
      routes: [
        { key: 'producer-gridview', permissions: true, path: PRODUCERLINK.GRID, exact: true, render: (props) => <Grid dfpayload={{ colSort: 'order', typeSort: 'asc' }} search sortHeader sortFooter meta={KEY} {...props} /> },
        { key: 'producer-form', permissions: true, path: PRODUCERLINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
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
