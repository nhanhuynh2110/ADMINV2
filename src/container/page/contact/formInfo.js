/* global _ */

import React, {useEffect, useState, forwardRef} from 'react'
import { Basic } from 'form-layout'
import async from 'async'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import STORELINK from '../../../helper/link'
import { withContainer } from '../../../context'
import modelForm from './model'
import conf from '../../../../config'
import useReactRouter from 'use-react-router'

const domain = conf.server.domain

const LINK = STORELINK.CONTACTLINK

const FormHandle = (props) => {
  const {data, api} = props
  const [model] = useModel(modelForm, data)

  const {name, email, fax, address, phone, fb, twitter, google, youtube, isActive} = model

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
    title='Contact Form'
    cancle={LINK.GRID}
    onSubmit={onSubmit}
    formValid={model.valid}
  >
    <div className='row'>
      <div className='col-md-6'>
        <Field.Input field={name} defaultValue={name.value} name={name.name} id='contact-info-name-id' placeholder='please enter name' className='form-control' onChange={onChange} />
        <Field.Input field={email} defaultValue={email.value} name={email.name} id='contact-info-email-id' placeholder='please enter email' className='form-control' onChange={onChange} />        
      </div>
      <div className='col-md-6'>
        <Field.Input field={fax} defaultValue={fax.value} name={fax.name} id='contact-info-fax-id' placeholder='please enter fax' className='form-control' onChange={onChange} />
        <Field.Input field={address} defaultValue={address.value} name={address.name} id='contact-info-address-id' placeholder='please enter address' className='form-control' onChange={onChange} />
        <Field.Input field={phone} defaultValue={phone.value} name={phone.name} id='contact-info-phone-id' placeholder='please enter phone' className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-3'>
        <Field.Input field={fb} defaultValue={fb.value} name={fb.name} id='contact-info-fb-id' placeholder='please enter link fb' className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-3'>
        <Field.Input field={twitter} defaultValue={twitter.value} name={twitter.name} id='contact-info-twitter-id' placeholder='please enter link twitter' className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-3'>
        <Field.Input field={google} defaultValue={google.value} name={google.name} id='contact-info-google-id' placeholder='please enter link google' className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-3'>
        <Field.Input field={youtube} defaultValue={youtube.value} name={youtube.name} id='contact-info-youtube-id' placeholder='please enter link youtube' className='form-control' onChange={onChange} />
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
