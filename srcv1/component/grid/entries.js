import React from 'react'
import {entries} from './data'

export default ({onChange}) => {
  return <div className='dataTables_length' id='example1_length'>
    <label>Hiển Thị &nbsp;</label>
    <select name='example1_length' aria-controls='example1' className='form-control input-sm' onChange={onChange}>
      {entries.map((e, i) => <option key={i} value={e.value}>{e.text}</option>)}
    </select>
    <div className='clearfix' />
  </div>
}