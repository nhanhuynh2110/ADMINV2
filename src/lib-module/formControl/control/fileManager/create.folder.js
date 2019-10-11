import React from 'react'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import modelForm from './create.folder.model'

const FormFolder = (props) => {

  const [model] = useModel(modelForm)
  const { folder } = model

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onAdd = () => {
    const data = model.data
    console.log(props.api)
    props.api.fileManager.createFolder({dirPath: data.folder}, (error, res) => {
      console.log('error, res')
      console.log(error, res)
    })
  }

  return <Form>
    <Field.Input.Groups
      field={folder}
      defaultValue={folder.value}
      name='folder'
      id='folder-file-manager'
      placeholder='Please enter folder name'
      className='form-control'
      onChange={onChange}
      isCheckSubmit={model.valid}
      hanldCheck={onAdd} />
  </Form>
}



export default FormFolder