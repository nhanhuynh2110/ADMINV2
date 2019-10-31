import React from 'react'
import Grid from '../../component/grid'
import STORELINK from '../storeLink'
import Tabs from '../../tabs'
import API from '../../api'
const LINK = STORELINK.CATEGORY

export default (props) => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    API.CategoryAPI.get({
      strKey: '',
      pageSize: 10,
      pageNumber: 1,
      colSort: 'createDate',
      typeSort: '',
      isDelete: 0})
      .then(data => {
        console.log(data)
      })
  }, [])

  if (!data) return null
  return <React.Fragment>
    <Grid
      title='Category1'
      link={LINK.grid}
      tabs={Tabs}
    />
  </React.Fragment>
}
