import React, {useEffect} from 'react'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import modelForm from './create.folder.model'

const FormFolder = (props) => {

  const [model] = useModel(modelForm)
  const { folder } = model

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onAdd = () => {
    if (typeof props.addFolder !== 'function') return
    const data = model.data
    const dirPath = props.currentPath ? props.currentPath + '/' + data.folder : data.folder
    props.api.fileManager.createFolder({dirPath}, (error, res) => {
      if (error) props.addFolder(false)
      else props.addFolder(true)
    })
  }

  const onClose = () => {
    if (typeof props.onClose !== 'function') return
    props.onClose()
  }

  useEffect (() => {
    // init()
    // if (model)
    model.validateModel()
  }, [model.valid])
  return <Form>
    <Field.Input.Groups
      field={folder}
      defaultValue={folder.value}
      name='folder'
      id='folder-file-manager'
      placeholder='Please enter folder name'
      className='form-control'
      onChange={onChange}
      isCheckSubmit={true}
      onClose={onClose}
      hanldCheck={onAdd} />
  </Form>
}



export default FormFolder