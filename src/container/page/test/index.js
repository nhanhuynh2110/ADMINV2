import React from 'react'
import Form, { Field } from 'lib-module/formControl'

const Layout = (props) => {
  return <React.Fragment>
    <form role='form'>
      <div className='box-body'>
        {props.children}
      </div>
    </form>
  </React.Fragment>
}

const field = {
  name: 'testinput',
  label: 'Test label'
}

const phoneField = {
  name: 'phone=input',
  label: 'Phone label'
}

const fieldSelect = {
  name: 'select-field',
  label: 'Select Field'
}

const fieldCheckBox = {
  name: 'checkbox-field',
  label: 'Checkbox Field'
}

const areafield = {
  name: 'area-field',
  label: 'Area Field'
}

const options = [
  { key: 'opt', value: '', test: 'choose' },
  { key: 'opt1', value: 'option1', test: 'option1' },
  { key: 'opt2', value: 'option2', test: 'option2' }
]

const onChange = (resp) => {
  console.log(resp)
}

export default () => {
  return <Form Layout={Layout}>
    <Field.Input field={field} name='testinput' id='input-id' placeholder='please enter' className='form-control' onChange={onChange} />
    <Field.Input.Phone field={phoneField} name='phone-input' id='input-phone-id' className='form-control' onChange={onChange} />
    <Field.Select field={fieldSelect} name='select-field' selectedValue='option1' options={options} id='select-id' className='form-control' onChange={onChange} />
    <Field.CheckBox field={fieldCheckBox} value='isActive' text='Active' onChange={onChange} />
    <Field.Area field={areafield} name='area-field' rows='5' defaultValue='value default' placeholder='please enter' className='form-control' id='area-id' onChange={onChange} />
  </Form>
}
