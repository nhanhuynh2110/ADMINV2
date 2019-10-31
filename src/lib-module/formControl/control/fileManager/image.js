import React from 'react'
import Field from '../../field/field'
import FileManager from './fileManager'

export default (props) => {
  const {field, value, name} = props

  const onChange = (res) => {
    if (typeof props.onChange !== 'function') return
    props.onChange({ value: res.path, name })
  }

  return <Field field={field}>
    <div className='form-group'>
      <div className='col-md-12'>
        <div className='position-relative w-100'>
          <img className='w-100 camera-image' src={value} />
          <FileManager
            api={props.api}
            onChange={onChange}
            triggerId={props.id}
            trigger={<div className='camera-image-upload-image' data-target={`#${props.id}`} data-toggle='modal'>
                <i className='fa fa-camera' />
              </div>}
            // <div className='file-manager-upload-image' data-target={`#${props.id}`} data-toggle='modal'><i className='fa fa-camera' /></div>}
          />
        </div>
      </div>

    </div>
  </Field>
}
