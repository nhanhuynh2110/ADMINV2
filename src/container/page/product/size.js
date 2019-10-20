import React from 'react'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import modelForm from './size.model'

const FormSize = ({children, formValid, onHandle}) => {
  return <div className='modal-dialog'>
    <div className='modal-content'>
      <div className='modal-header'>
        <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
          <span aria-hidden='true'>×</span></button>
        <h4 className='modal-title'>Default Modal</h4>
      </div>
      <div className='modal-body'>
        {children}
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-default pull-left' data-dismiss='modal'>Close</button>
        <button type='button' disabled={!formValid} className='btn btn-primary' onClick={onHandle}>Save changes</button>
      </div>
    </div>
  </div>
}

export default (props) => {
  const {data} = props
  const [model] = useModel(modelForm, data || null)
  const {size, color} = model

  let [sizes, setSizes] = React.useState([])

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    const dt = model.data
    const sizesArr = []
    sizesArr.push({ size: dt.size, color: dt.color })
    setSizes(sizesArr)
  }

  return <React.Fragment>
    <div className='nav-tabs-custom product-size'>
      <ul className='nav nav-tabs'>
        {sizes.map(el => {
          return <li key={el.size} className=''><a href={`#tab-${el.size}`} data-toggle='tab' aria-expanded='false'>{el.size}</a></li>
        })}

        {/* <li className='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Tab 1</a></li>
        <li className=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Tab 2</a></li>
        <li><a href='#tab_3' data-toggle='tab'>Tab 3</a></li> */}
        <li className='dropdown'>
          <button data-target='#modal-default' data-toggle='modal' type='button' className='btn btn-primary'>Add Style</button>
        </li>
        <li className='pull-right'><a className='text-muted'><i className='fa fa-gear' /></a></li>
      </ul>
      <div className='tab-content'>
        <div className='tab-pane active' id='tab_1'>
          {sizes.map(el => {
            return <div key={`tab-content-${el.size}`} className='tab-pane' id={`tab-${el.size}`}>
              <i className='fa fa-circle-o text-red' />
            </div>
          })}
        </div>
      </div>
    </div>

    <div className='modal' id='modal-default'>
      <Form
        onHandle={onSubmit}
        Layout={FormSize}
        formValid={model.valid}
      >
        <Field.Input field={size} defaultValue={size.value} name={size.name} id='pro-title-id' placeholder={size.placeholder} className='form-control' onChange={onChange} />
        <Field.Input.ColorPicker field={color} id='size-color-id' name={color.name} className='form-control' onChange={onChange} />
      </Form>
    </div>
  </React.Fragment>
}
