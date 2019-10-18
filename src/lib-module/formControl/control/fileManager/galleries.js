import React from 'react'
import Field from '../../field/field'
import FileManager from './fileManager'

export default (props) => {
  const {field, value, name} = props

  const onChange = (res) => {
    if (typeof props.onChange !== 'function') return
    props.onChange({ value: res.paths, name })
  }

  return <Field field={field}>
    <div className='timeline-body'>
      <FileManager
        multiple
        api={props.api}
        onChange={onChange}
        triggerId={props.id}
        trigger={<a data-target={`#${props.id}`} data-toggle='modal' className='add-galleries-icon'><i className='fa fa-plus' /></a>}
      />
      <img src='http://placehold.it/150x100' alt='...' className='margin' />
      <img src='http://placehold.it/150x100' alt='...' className='margin' />
      <img src='http://placehold.it/150x100' alt='...' className='margin' />
    </div>
  </Field>

  // return <Field field={field}>
  //   <div className='form-group'>
  //     <div className='col-md-12'>
  //       <div className='position-relative w-100'>
  //         <img className='w-100 file-manager-image' src={value} />
  //         <FileManager
  //           mutiple
  //           api={props.api}
  //           onChange={onChange}
  //           triggerId={props.id}
  //           trigger={<div className='file-manager-upload-image' data-target={`#${props.id}`} data-toggle='modal'><i className='fa fa-camera' /></div>}
  //         />
  //       </div>
  //     </div>

  //   </div>
  // </Field>
}
