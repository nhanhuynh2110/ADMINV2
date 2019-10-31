import React, { useState, useEffect, useCallback } from 'react'
// import _ from 'lodash'
import { subscribe } from '../core'
import DataTable from '../core/dataTable/dataTable'
import userTableModel from '../dataTable/category'
import {TableBasic} from '../component/table'

const Component1 = ({ data }) => {
  const { user1 } = data

  const table = new DataTable(userTableModel, user1)

  const [opts, setOpts] = useState({
    filter: null,
    sort: null
  })

  useEffect(() => {
    setOpts({
      sort: ['name', 'desc'],
      filter: r => r.data.id > 1
    })
  }, [])

  const select = useCallback(selectedRows => {
    selectedRows.forEach(r => {
      console.log(`You're selecting: ` + r.income)
      console.log('Raw data: ' + r.data.income)
    })
  }, [])

  return (
    <TableBasic model={table} onSelect={select} selectMode='single' {...opts} />
  )
}

export default subscribe({
  user1: [
    { id: 1, name: 'Joey', dob: new Date(1982, 7, 27), income: 15000000 },
    { id: 2, name: 'Annie', dob: new Date(1997, 0, 13), income: 10000000 },
    { id: 3, name: 'Vivien', dob: new Date(2015, 11, 2), income: 10000000 }
  ]
})(Component1)
