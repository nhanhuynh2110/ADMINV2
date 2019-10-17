import React, {useEffect} from 'react'
import Actions from './actions'

export default (props) => {
  const {multiple} = props

  useEffect(() => {

  }, [multiple])

  return <div className='modal-header'>
    <div className='groups-buttons' >
      {/* <Actions /> */}
      {props.multiple && <button type='button' className='btn btn-primary'>
        Choose Image &ensp;
        <span className='fa fa-file-image-o' />
      </button>}
      &ensp; &ensp;
      <button onClick={props.callUpload} type='button' className='btn btn-default'>
        Uploads &ensp;
        <span className='fa fa-upload' />
      </button>
      &ensp; &ensp;
      <button onClick={props.toggleFormUploadDrop} type='button' className='btn btn-default'>
        Uploads Crop &ensp;
        <span className='fa fa-upload' />
      </button>
      &ensp; &ensp;
      <button onClick={props.createFolder} type='button' className='btn btn-default'>
        New Folder &ensp;
        <span className='fa fa-plus' />
      </button>
    </div>
  </div>
}
