import React from 'react'
import Actions from './actions'

export default (props) => {
  return <div className='modal-header'>
    <div className='groups-buttons' >
      {/* <a><i className='fa fa-upload' /></a> */}
      <Actions />
      &ensp; &ensp;
      <button onClick={props.createFolder} type='button' className='btn btn-default'>
        New Folder &ensp;
        <span className='fa fa-plus' />
        {/* <i className='fa fa-plus' /> */}
      </button>
      {/* <a onClick={props.createFolder}><i className='fa fa-plus' /> <i className='fa fa-folder' /></a> */}
    </div>
  </div>
}
