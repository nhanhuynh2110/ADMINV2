import React from 'react'
import _ from 'lodash'
import async from 'async'

import Model from './model'
import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import config from '../../../../config'
import STORELINK from '../../../helper/link'
import Select from '../../../component/control/select'

const LINK = STORELINK.ACCOUNTLINK

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
      if (!this.props.data) {
        this.props.api.account.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          alert('save success')
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.account.update(dt, (err, resp) => {
          if (err) alert('update fail')
          alert('update success')
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  render () {
    let {onInputChange, roles} = this.props
    let { avatar, password, username, phone, address, gender, isActive, roleId } = this.props.model

    var linkImg = (avatar.value) ? domain + avatar.value : 'https://img7.androidappsapk.co/115/7/3/a/com.profile.admires_stalkers_unknown.png'
    return (
      <FormLayoutDefault
        title='Create Account'
        linkCancleBtn={LINK.GRID}
        isFormValid={this.props.isFormValid}
        isSubmit
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
      >
        <form role='form'>
          <div className='box-body'>

            <div className='box-body box-profile'>
              <img className='profile-user-img img-responsive img-circle' src={linkImg} alt='User profile picture' />
              <h3 className='profile-username text-center'>Avatar</h3>
              <Field field={avatar}>
                <div className='upload-image'>
                  <button className='btn btn-block btn-success'>Avatar</button>
                  <input data-name='avatar' data-folder='account' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
            </div>

            <Field field={username}>
              <input type='text' className='form-control' placeholder={username.placeholder} onChange={onInputChange} defaultValue={username.value} />
            </Field>

            <Field field={password}>
              <input type='password' className='form-control' placeholder={password.placeholder} onChange={onInputChange} defaultValue={password.value} />
            </Field>

            <Field field={roleId}>
              <Select isSelected={roleId.value} name='roleId' options={roles} classSelect='select2' onChange={(e) => onInputChange(null, {name: 'roleId', value: e.target.value})} />
            </Field>

            <Field field={phone}>
              <input type='text' className='form-control' placeholder={phone.placeholder} onChange={onInputChange} defaultValue={phone.value} />
            </Field>

            <Field field={address}>
              <input type='text' className='form-control' placeholder={address.placeholder} onChange={onInputChange} defaultValue={address.value} />
            </Field>

            <Field field={gender}>
              <Select isSelected={parseInt(gender.value)} name='gender' options={gender.options} classSelect='select2' onChange={(e) => onInputChange(null, {name: 'gender', value: e.target.value})} />
            </Field>

            <Field field={isActive}>
              <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'isActive', value: !isActive.value })}>
                {isActive.value && <i className='fa fa-check' />}
              </span>
            </Field>
          </div>
        </form>
      </FormLayoutDefault>
    )
  }
}
const FormBox = withFormBehaviors(Form, Model)
class FormWrapper extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      roles: [],
      data: null
    }
  }

  componentDidMount () {
    let {match} = this.props
    if (!match) return
    const {params} = match
    let pararel = {}
    const roles = (cb) => {
      this.props.api.role.getAll({}, cb)
    }

    const account = (cb) => {
      this.props.api.account.get({id: params.id}, cb)
    }

    pararel['roles'] = roles
    if (params.id) pararel['account'] = account

    async.parallel(pararel, (err, data) => {
      if (err) return
      let {roles, account} = data
      let dtRole = roles.map(el => ({ text: el.title, value: el._id }))
      this.setState({ roles: dtRole, data: account })
    })
  }
  render () {
    return <FormBox data={this.state.data} roles={this.state.roles} api={this.props.api} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
