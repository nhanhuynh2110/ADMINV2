import React from 'react'
import Actions from './actions'

export default (props) => {
  return <div className='modal-header'>
    <div className='groups-buttons' >
      {/* <a><i className='fa fa-upload' /></a> */}
      <Actions />
      <a onClick={props.createFolder}><i className='fa fa-plus' /> <i className='fa fa-folder' /></a>
    </div>
  </div>
}