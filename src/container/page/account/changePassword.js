import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import { withContainer } from '../../../context'
import Model from './changePassword.model'

class ChangePassword extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.props.onInputChange(_.clone(e))
  }

  render () {
    let {model, isFormValid, hasChanged, onInputChange, currentUser} = this.props

    let {password, newPassword, confirmNewPassword} = model
    return (
      <div className='login-box'>
        <div className='login-logo'>
          <a><b>Admin</b>LTE</a>
        </div>
        <div className='login-box-body'>
          <p className='login-box-msg'>Sign in to start your session</p>
          <form role='form'>
            <Field field={password} className={'has-feedback'}>
              <React.Fragment>
                <input name='password' type='text' className='form-control' onChange={this.onChange} defaultValue={password.value} placeholder={password.placeholder} />
                <span className='glyphicon glyphicon-lock form-control-feedback' />
              </React.Fragment>
            </Field>
            <Field field={newPassword} className={'has-feedback'}>
              <React.Fragment>
                <input type='password' name='newPassword' className='form-control' onChange={this.onChange} defaultValue={newPassword.value} placeholder={newPassword.placeholder} />
                <span className='glyphicon glyphicon-lock form-control-feedback' />
              </React.Fragment>
            </Field>
            <Field field={confirmNewPassword} className={'has-feedback'}>
              <React.Fragment>
                <input type='password' name='confirmNewPassword' className='form-control' onChange={this.onChange} defaultValue={newPassword.value} placeholder={confirmNewPassword.placeholder} />
                <span className='glyphicon glyphicon-log-in form-control-feedback' />
              </React.Fragment>
            </Field>
            <div className='row'>
              <div className='col-xs-12'>
                <input
                  type='submit'
                  defaultValue='Change'
                  className='btn btn-primary btn-block btn-flat' />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const FormBox = withFormBehaviors(ChangePassword, Model)

class FormWrapper extends React.PureComponent {
  render () {
    let data = {}
    return <FormBox data={data} currentUser={this.props.currentUser} api={this.props.api} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api,
  currentUser: c.data.currentUser
}))
