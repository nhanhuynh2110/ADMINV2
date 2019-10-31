import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'category-post'

export default class CategoryPost extends React.PureComponent {
  constructor (props) {
    super(props)
    const CATEGORYPOSTLINK = LINK.CATEGORYPOSTLINK
    this.state = {
      routes: [
        { key: 'catagory-post-gridview', permissions: ['CATEGORYPOSTVIEW'], path: CATEGORYPOSTLINK.GRID, exact: true, render: (props) => <Grid dfpayload={{ colSort: 'order', typeSort: 'asc' }} search sortHeader sortFooter meta={KEY} {...props} /> },
        // { key: 'catagory-form', permissions: ['CATEGORYPOSTADD'], exact: true, path: CATEGORYPOSTLINK.ADD, render: (props) => <FormWrapper {...props} /> },
        { key: 'catagory-post-form', permissions: ['CATEGORYPOSTEDIT'], path: CATEGORYPOSTLINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
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
