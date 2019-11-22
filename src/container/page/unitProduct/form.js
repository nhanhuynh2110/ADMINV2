/* global _ */

import React, {useEffect, useState, forwardRef} from 'react'
import { Basic } from 'form-layout'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import STORELINK from '../../../helper/link'
import { withContainer } from '../../../context'
import modelForm from './model'
import conf from '../../../../config'

const domain = conf.server.domain

const LINK = STORELINK.UNITPRODUCTLINK

const FormHandle = (props) => {
  const {data, api} = props
  const [model] = useModel(modelForm, data)

  const {title, isActive} = model

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    const formData = model.data
    api.contactInfo.update(formData, (err, resp) => {
      if (err) return alert('update fail')
      alert('success')
    })
  }

  let activeChecked = isActive.value

  return <Form
    Layout={Basic}
    title='Unit Product Form'
    cancle={LINK.GRID}
    onSubmit={onSubmit}
    formValid={model.valid}
  >
    <div className='row'>
      <div className='col-md-6'>
        <Field.Input field={title} defaultValue={title.value} name={title.name} id='unit-product-title-id' placeholder='please enter title' className='form-control' onChange={onChange} />
      </div>
    </div>

    <div className='row'>
      <div className='col-md-12'>
        <Field.CheckBox field={isActive} id='category-active-id' defaultChecked={activeChecked} value={isActive.value} name={isActive.name} text='Active' onChange={onChange} />
      </div>
    </div>
  </Form>
}

const FormWrapper = forwardRef((props, ref) => {
  const {api} = props
  let [formData, setFormData] = useState({
    data: null
  })
  useEffect(() => {
    api.contactInfo.get({}, (err, data) => {
      if (err) return
      setFormData({ data })
    })
  }, [])
  return formData && <FormHandle data={formData.data} api={api} />
})

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
