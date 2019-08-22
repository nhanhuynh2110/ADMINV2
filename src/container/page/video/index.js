import React from 'react'
import { Route } from 'react-router-dom'

import Grid from '../../../component/grid'
import Form from './form'
import { VIDEOLINK as LINK } from '../../../helper/link'
const KEY = 'video'

export default class Category extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Route path={LINK.GRID} exact render={() => <Grid meta={KEY} />} />
        <Route path={LINK.ADD} exact render={() => <Form />} />
      </React.Fragment>
    )
  }
}
