import React from 'react'
import {Form, Box} from 'control'
import STORELINK from '../storeLink'
const LINK = STORELINK.CATEGORY

import loginModel from './modeltest'
import { useModel } from '../../core'

export default ({data}) => {
  const model = useModel(loginModel, data)
  const { email, password, retypePassword, file } = model

  const submit = () => {
    console.log('Data', model.data)
    console.log('Error', model.errors)
  }
  const passwordChange = e => {
    password.extractFromEvent(e)
  }
  const commonChange = e => {
    model.extractFromEvent(e)
  }
  const fileChange = e => {
    const {
      target: { files }
    } = e
    file.setValue(files)
  }
  return <Form onSubmit={submit}>
    <Form.Layout title='Create Category' cancle={LINK.grid} formValid>
      
    <div>
      <div>
        {/* <label>
          {file.label}: {file.value.name}
          <input
            type='file'
            onChange={fileChange}
            style={{ opacity: 0, position: 'absolute' }}
          />
        </label>
        {!file.isValid ? <p>{file.error.message}</p> : <p />} */}
      </div>
      <div>
        <label htmlFor={email.name}>{email.label}</label>
        <br />
        <input
          type='text'
          name={email.name}
          id={email.name}
          value={email.value}
          onChange={commonChange}
        />
        {!email.isValid ? <p>{email.error.message}</p> : <p />}
      </div>
      <div>
        <label htmlFor={password.name}>{password.label}</label>
        <br />
        <input
          type='text'
          name={password.name}
          id={password.name}
          value={password.value}
          onChange={passwordChange}
        />
        {!password.isValid ? <p>{password.error.message}</p> : <p />}
      </div>
      <div>
        <label htmlFor={retypePassword.name}>{retypePassword.label}</label>
        <br />
        <input
          type='text'
          name={retypePassword.name}
          id={retypePassword.name}
          value={retypePassword.value}
          onChange={commonChange}
        />
        {!retypePassword.isValid ? (
          <p>{retypePassword.error.message}</p>
        ) : (
          <p />
        )}
      </div>
    </div>
    
    </Form.Layout>
  </Form>
}