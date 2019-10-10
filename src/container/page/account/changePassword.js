import React, {forwardRef} from 'react'
import _ from 'lodash'
import { withContainer } from '../../../context'
import modelForm from './changePassword.model'

import Form, { Field, Model as useModel } from 'lib-module/formControl'
import { Center } from 'form-layout'


const ChangePasswordForm = React.forwardRef((props, ref) => {
  const [model] = useModel(modelForm)
  const { password, newPassword, confirmPassword } = model
  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    props.api.account.changePassword(model.data, (err, res) => {
      if (err || !res) return alert(err)
      location.href = '/login'
    })
  }

  return <Form Layout={Center} onSubmit={onSubmit} title='Change password'>
    <Field.Input
      afterDom={<span className='glyphicon glyphicon-lock form-control-feedback' />}
      autoComplete='current-password'
      field={password} type='password'
      defaultValue={password.value}
      name='password'
      id='password-old'
      placeholder='please enter'
      className='form-control'
      onChange={onChange} />

    <Field.Input
      afterDom={<span className='glyphicon glyphicon-lock form-control-feedback' />}
      autoComplete='new-password'
      field={newPassword}
      type='password'
      defaultValue={newPassword.value}
      name='newPassword'
      id='new-password'
      placeholder='please enter new password'
      className='form-control'
      onChange={onChange} />

    <Field.Input
      afterDom={<span className='glyphicon glyphicon-log-in form-control-feedback' />}
      autoComplete='new-password'
      field={confirmPassword}
      type='password'
      defaultValue={confirmPassword.value}
      name='confirmPassword'
      id='confirm-password'
      placeholder='please enter confirm password'
      className='form-control'
      onChange={onChange} />
  </Form>
})

export default withContainer(ChangePasswordForm, (c, props) => ({
  api: c.api
}))


