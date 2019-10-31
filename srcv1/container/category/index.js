import React from 'react'
import {APICategory} from '../../api'
import STORELINK from '../storeLink'
import model from '../../dataTable/category'
import {Grid, Tabs} from '../../component'
const LINK = STORELINK.CATEGORY
export default () => {
  return <Grid
    model={model}
    initFilter={{...Grid.filter, level: ''}}
    api={APICategory}
    title='Category'
    linkAdd={LINK.add}
    tabs={Tabs.Category}
  />
}
