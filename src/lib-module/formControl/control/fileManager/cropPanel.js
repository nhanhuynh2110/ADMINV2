import React, {useRef} from 'react'
import CropImage from 'lib-module/cropImage'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import modelForm from './cropPanel.model'

import conf from '../../../../../config'

const domain = conf.server.domain

function FileListItem (a) {
  a = [].slice.call(Array.isArray(a) ? a : arguments)
  for (var c, b = c = a.length, d = !0; b-- && d;) d = a[b] instanceof File
  if (!d) throw new TypeError('expected argument to FileList is File or array of File objects')
  for (b = (new ClipboardEvent('')).clipboardData || new DataTransfer; c--;) b.items.add(a[c])
  return b.files
}

const FormLayout = ({children, title, onClose}) => {
  return <div className='file-manager-crop-form col-md-3 col-xm-3 col-xs-10'>
    <div className='box box-info'>
      <div className='box-header with-border'>
        <h3 className='box-title'>{title}</h3>
        <div className='box-tools pull-right'>
          <button type='button' className='btn btn-box-tool' data-widget='collapse' data-toggle='control-sidebar' title='' data-original-title='Collapse'>
            <i className='fa fa-minus' />
          </button>
          <button type='button' className='btn btn-box-tool' onClick={onClose}>
            <i className='fa fa-times' />
          </button>
        </div>
      </div>

      <div className='box-body'>
        {children}
        
      </div>

      <div className='box-footer'>
        <button type='button' onClick={onClose} className='btn btn-default'>Cancel</button>
        <button type='submit' className='btn btn-info pull-right'>Crop &ensp; <span className='fa fa-save' /></button>
      </div>
      {/* <div className='overlay'>
          <i className='fa fa-refresh fa-spin' />
      </div> */}
    </div>
  </div>
}

export default React.forwardRef((props, ref) => {
  const {folders = [], currentPath, data, onClose} = props

  const [model] = useModel(modelForm)
  const {size, selectFolder, fileName, fileType} = model
  const image = currentPath ? `${domain}/file-manager/${currentPath}/${data.path}` : `${domain}/file-manager/${data.path}`

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    const dataModel = model.data
    const pathLink = currentPath ? `${currentPath}/${data.path}` : data.path
    const url = `${domain}/download?path=${pathLink}`

    const s = dataModel.size
    const f = dataModel.selectFolder
    const fn = dataModel.fileName
    const ft = dataModel.fileType
    const sizeArr = s.split('x')

    const options = { width: parseInt(sizeArr[0]), height: (sizeArr[1]) }

    CropImage({
      url,
      options,
      fileName: fn,
      fileType: ft
    }).then(fileObj => {
      const fileList = new FileListItem([fileObj.file])
      document.getElementById('image-crop').src = fileObj.dataURL

      props.onSubmit(null, { files: fileList, folder: f })
    })
  }

  let folderOptions = folders.map(el => {
    return { key: el.name, text: el.name, value: el.name }
  })

  folderOptions.unshift({ key: 'chooseid', text: 'Choose folder', value: '' })

  return <Form
    Layout={FormLayout}
    onSubmit={onSubmit}
    title='Crop Image Form'
    onClose={onClose}>
    <div className='form-group'>
      <label>Image</label>
      <img src={image} style={{ width: '100%' }} />
    </div>
    <Field.Input field={size} defaultValue={size.value} name='size' id='size-data' placeholder='please enter size' className='form-control' onChange={onChange} />
    <Field.Input field={fileName} defaultValue={fileName.value} name='fileName' id='file-size-data' placeholder='please enter file name' className='form-control' onChange={onChange} />
    <Field.Input field={fileType} defaultValue={fileType.value} name='fileType' id='file-type-data' placeholder='please enter file type' className='form-control' onChange={onChange} />
    <Field.Select field={selectFolder} name='selectFolder' selectedValue='option1' options={folderOptions} id='select-folder' className='form-control' onChange={onChange} />

    <div className='form-group text-center'>
      <img id='image-crop' style={{ width: '150px' }} />
    </div>
  </Form>
})
