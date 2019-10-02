import React from 'react'
import _ from 'lodash'
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'

import { withFormBehaviors } from '../../../component/form/form'
import { withContainer } from '../../../context'
import config from '../../../../config'
import Model from './profile.model'
import Field from '../../../component/form/field'
import Select from '../../../component/control/select'

import 'react-datepicker/dist/react-datepicker.css'

let domain = config.server.domain

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  uploadFile (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')

    this.props.api.file.upload(false, files, name, folder, (err, resp) => {
      if (err) this.props.onInputChange(null, { name, value: null })
      else this.props.onInputChange(null, {name, value: resp.img})
    })
  }

  handleSubmit () {
    this.props.handleSubmitSingle((data) => {
      if (!this.props.data) return
      let dt = data
      dt.id = this.props.currentUser._id
      this.props.api.account.updateProfile(dt, (err, resp) => {
        if (err) alert('update fail')
        alert('update success')
      })
      this.props.handleSubmitFinish()
    })
  }

  render () {
    let {model, isFormValid, hasChanged, onInputChange, currentUser} = this.props
    let {avatar, firstname, lastname, address, phone, birthdate, gender} = model
    let {email, username} = currentUser 
    var linkAvatar = (avatar.value) ? domain + avatar.value : 'https://img7.androidappsapk.co/115/7/3/a/com.profile.admires_stalkers_unknown.png'
    return (
      <section className='content'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='box box-primary'>
              <div className='box-body box-profile'>
                <img className='profile-user-img img-responsive img-circle' src={linkAvatar} alt='User profile picture' />
                <h3 className='profile-username text-center'>GROUP DEV</h3>
                <p className='text-muted text-center'>Admin Group</p>
                <Field field={avatar}>
                  <div className='upload-image'>
                    <button className='btn btn-block btn-success'>Avatar</button>
                    <input data-name='avatar' data-folder='account' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                  </div>
                </Field>
              </div>
            </div>

            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Create Account</h3>
              </div>
              <form role='form'>
                <div className='box-body'>
                  <div className='form-group'>
                    <label>UserName: </label>
                    <span> {username}</span>
                  </div>
                  <div className='form-group'>
                    <label>Email: </label>
                    <span> {email}</span>
                  </div>
                </div>
              </form>
            </div>

          </div>
          <div className='col-md-8'>
            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Account info</h3>
              </div>
              <form role='form'>
                <div className='box-body'>
                  <Field field={firstname}>
                    <input type='text' className='form-control' placeholder={firstname.placeholder} onChange={onInputChange} defaultValue={firstname.value} />
                  </Field>

                  <Field field={lastname}>
                    <input type='text' className='form-control' placeholder={lastname.placeholder} onChange={onInputChange} defaultValue={lastname.value} />
                  </Field>

                  <div className='form-group'>
                    <label>Fullname</label>
                    <span> {`${firstname.value} ${lastname.value}`.trim()}</span>
                  </div>

                  <Field field={address}>
                    <input type='text' className='form-control' placeholder={address.placeholder} onChange={onInputChange} defaultValue={address.value} />
                  </Field>

                  <Field field={phone}>
                    <input type='text' className='form-control' placeholder={phone.placeholder} onChange={onInputChange} defaultValue={phone.value} />
                  </Field>

                  <Field field={birthdate}>
                    <DatePicker className='form-control' selected={birthdate.value ? new Date(birthdate.value) : new Date()} onChange={(date) => onInputChange(null, {name: 'birthdate', value: date})} />
                  </Field>

                  <Field field={gender}>
                    <Select name='gender' isSelected={parseInt(gender.value)} options={gender.options} classSelect='select2' onChange={onInputChange} />
                  </Field>
                </div>
              </form>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='box box-success'>
              <div className='box-body'>
                <div className='pull-left'>
                  <Link to='/account' className='btn btn-danger btn-xs'>Cancle</Link>
                </div>

                <div className='pull-right'>
                  <input
                    className='btn btn-success btn-xs'
                    disabled={!isFormValid || (!hasChanged)}
                    type='submit'
                    defaultValue='Save'
                    onClick={this.handleSubmit} />
                </div>

                <div className='clearfix' />
              </div>
            </div>
          </div>

        </div>
      </section>
    )
  }
}

const FormBox = withFormBehaviors(Form, Model)

class FormWrapper extends React.PureComponent {
  render () {
    let data = _.pick(this.props.currentUser, ['avatar', 'firstname', 'lastname', 'address', 'phone', 'birthdate', 'gender'])
    return <FormBox data={data} currentUser={this.props.currentUser} api={this.props.api} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api,
  currentUser: c.data.currentUser
}))
