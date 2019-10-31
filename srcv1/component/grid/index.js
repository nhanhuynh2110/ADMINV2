import React from 'react'
import GridAPI from './grid'
import Tabs from './tabs'

import GridLayout from './layout'

export default ({ title, link, tabs, payload }) => {
  const gridAPI = new GridAPI({})
  console.log('111111', 111111)
  const hadleTab = (tab) => {
    console.log('tab', tab)
  }

  return <GridLayout
    title={title}
    link={link}>
    <Tabs options={tabs} onChange={hadleTab} />
    payload
  </GridLayout>
}
