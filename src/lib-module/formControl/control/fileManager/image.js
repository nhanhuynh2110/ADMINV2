import React from 'react'
import Field from '../../field/field'
import FileManager from './fileManager'

export default (props) => {
  const {field, value, name} = props

  const onChange = (res) => {
    console.log('res', res)
    if (typeof props.onChange !== 'function') return
    props.onChange({ value: res.path, name })
  }

  return <Field field={field}>
    <div className='form-group'>
      <div className='col-md-12'>
        {/* <img className='w-100 file-manager-image' src='http://localhost:3100//gallery/e6a8d42e14ccf1d09c6db882378627eb4d1505d7.png' /> */}
        <img className='w-100 file-manager-image' src={value} />
        <FileManager
          api={props.api}
          onChange={onChange}
          triggerId={props.id}
          trigger={<button data-target={`#${props.id}`} data-toggle='modal' type='button' className='file-manager-upload-image position-absolute btn btn-success'>Upload</button>}
        />
      </div>

    </div>
  </Field>
}
