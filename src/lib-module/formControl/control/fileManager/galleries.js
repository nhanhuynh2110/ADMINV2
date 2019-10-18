import React from 'react'
import Field from '../../field/field'
import FileManager from './fileManager'
import conf from '../../../../../config'

const domain = conf.server.domain

export default (props) => {
  const {field, value = [], name} = props

  const onChange = (res) => {
    if (typeof props.onChange !== 'function') return
    props.onChange({ value: res.paths, name })
  }

  const deleteImage = (e) => {
    let newValue = []
    var img = e.target.getAttribute('data-img')
    if (!value.includes(img)) return
    newValue = value.filter(el => el !== img)
    onChange({ paths: newValue })
  }

  console.log('value', value)
  return <Field field={field}>
    <div className='timeline-body'>
      <FileManager
        multiple
        api={props.api}
        onChange={onChange}
        triggerId={props.id}
        trigger={<a data-target={`#${props.id}`} data-toggle='modal' className='add-galleries-icon'><i className='fa fa-plus' /></a>}
      />

      {value && value.map(el => {
        return <a key={el}><img src={`${domain}/${el}`} alt='...' className='margin' /><i data-img={el} onClick={deleteImage} className='fa fa-remove' /></a>
      })}
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
