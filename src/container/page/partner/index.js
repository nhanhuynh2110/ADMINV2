import React from 'react'
import { Route } from 'react-router-dom'

import Grid from '../../../component/grid'
import Form from './form'
import { PARTNERLINK as LINK } from '../../../helper/link'
const KEY = 'partner'

export default class Partner extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Route path={LINK.GRID} exact render={() => <Grid meta={KEY} />} />
        <Route path={LINK.ADD} exact render={() => <Form />} />
      </React.Fragment>
    )
  }
}
