import React, {useState, useEffect} from 'react'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import { Basic } from 'form-layout'
import modelForm from './test.model'

export default () => {
  const [model] = useModel(modelForm)

  // const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const { title, title1, sl } = model
  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const valid = model.valid
  return <Form Layout={Basic}>
    <Field.Input field={title} defaultValue={title.value} name='title' id='input-id' placeholder='please enter' className='form-control' onChange={onChange} />
    <Field.Input field={title1} name='title1' id='input-id-1' placeholder='please enter' className='form-control' onChange={onChange} />
    <Field.Select field={sl} name='sl' selectedValue='option1' options={sl.options} id='select-id' className='form-control' onChange={onChange} />
    {valid && <input type='button' value='Save' onClick={() => console.log(model, model.data)} />}
    {/* <Field.Input.Phone icon='fa fa-phone' field={phoneField} name='phone-input' id='input-phone-id' className='form-control' onChange={onChange} />
    <Field.Select field={fieldSelect} name='select-field' selectedValue='option1' options={options} id='select-id' className='form-control' onChange={onChange} />
    <Field.CheckBox field={fieldCheckBox} value='isActive' text='Active' onChange={onChange} />
    <Field.Area field={areafield} name='area-field' rows='8' defaultValue='value default' placeholder='please enter' className='form-control' id='area-id' onChange={onChange} /> */}
 
  
  </Form>
}
