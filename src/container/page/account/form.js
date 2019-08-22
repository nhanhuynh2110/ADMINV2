import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { withFormBehaviors } from '../../../component/form/form'
import { withContainer } from '../../../context'
import config from '../../../../config'
import Model from './model'
import Field from '../../../component/form/field'

let domain = config.server.domain

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.changeDatepicker = this.changeDatepicker.bind(this)
  }
  uploadFile (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')

    this.props.api.file.upload(files, name, folder, (err, resp) => {
      if (err) this.props.onInputChange(null, { name, value: null })
    })
  }

  changeDatepicker (date, name, term) {

  }

  render () {
    let {avatar, username, email, firstname, lastname, address, phone, birthday} = this.props.model
    console.log('birthday', moment(birthday.value))
    var linkAvatar = (avatar.value) ? domain + avatar.value : 'https://img7.androidappsapk.co/115/7/3/a/com.profile.admires_stalkers_unknown.png'
    return (
      <section className='content'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='box box-primary'>
              <div className='box-body box-profile'>
                <img className='profile-user-img img-responsive img-circle' src={linkAvatar} alt='User profile picture' />
                <h3 className='profile-username text-center'>GROUP DEV</h3>
                <p className='text-muted text-center'>Nhóm Quản Trị</p>
                <Field field={avatar}>
                  <div className='upload-image'>
                    <button className='btn btn-block btn-success'>Tải Hình Ảnh</button>
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
                  <Field field={username}>
                    <input type='text' className='form-control' placeholder={username.placeholder} onChange={this.props.onInputChange} defaultValue={username.value} />
                  </Field>

                  <Field field={email}>
                    <input type='text' className='form-control' placeholder={email.placeholder} onChange={this.props.onInputChange} defaultValue={email.value} />
                  </Field>
                </div>
              </form>
            </div>

          </div>
          <div className='col-md-6'>
            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Thông tin tài khoản</h3>
              </div>
              <form role='form'>
                <div className='box-body'>
                  <Field field={firstname}>
                    <input type='text' className='form-control' placeholder={firstname.placeholder} onChange={this.props.onInputChange} defaultValue={firstname.value} />
                  </Field>

                  <Field field={lastname}>
                    <input type='text' className='form-control' placeholder={lastname.placeholder} onChange={this.props.onInputChange} defaultValue={lastname.value} />
                  </Field>

                  <div className='form-group'>
                    <label>Tên Đầy Đủ</label>
                    <span> {`${firstname.value} ${lastname.value}`}</span>
                  </div>

                  <Field field={address}>
                    <input type='text' className='form-control' placeholder={address.placeholder} onChange={this.props.onInputChange} defaultValue={address.value} />
                  </Field>

                  <Field field={phone}>
                    <input type='text' className='form-control' placeholder={phone.placeholder} onChange={this.props.onInputChange} defaultValue={phone.value} />
                  </Field>

                  <Field field={birthday}>
                    <DatePicker className='form-control' selected={birthday.value ? moment(birthday.value) : moment()} onChange={(date) => this.props.onInputChange(null, {name: 'birthday', value: date.format('DD-MM-YYYY')})} />
                  </Field>
                  {/* <div className='form-group'>
                    <label>Địa Chỉ</label>
                    <input type='text' className='form-control' placeholder='Địa Chỉ' value={this.state.fields.address.value || ''} data-name={this.state.fields.address.name} onChange={this.changeData} />
                  </div>
                  <div className='form-group'>
                    <label>Phone</label>
                    <input type='number' className='form-control' placeholder='Số Điện Thoại' value={this.state.fields.phone.value || ''} data-name={this.state.fields.phone.name} onChange={this.changeData} />
                  </div>
                  <div className='form-group'>
                    <label>Ngày Sinh</label>
                    <DatePicker className='form-control' selected={this.state.dateBirthday}
                      onChange={(date) => this.changeDatepicker(date, this.state.fields.birthday.name, 'dateBirthday')} />
                  </div>
                  <div className='form-group'>
                    <label>Giới Tính {this.state.fields.gender.value}</label>
                    <SelectOption isSelected={this.state.fields.gender.value} name={this.state.fields.gender.name} data={this.state.gender} classSelect='select2' onChange={this.changeData} />
                  </div>
                  <div className='form-group'>
                    <span data-name={this.state.fields.is_active.name} className='checkbox-react' onClick={this.changeDataCheckbox}>
                      {this.state.fields.is_active.value === 1 ? <i className='fa fa-check' /> : ''}
                    </span>
                    Kích Hoạt
                  </div> */}
                </div>
              </form>
            </div>
          </div>
          {/* <div className='col-md-3'>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Cài Đặt</h3>
              </div>
              <form role='form'>
                <div className='form-group'>
                  <label>Nhận Mail</label>
                  <span data-name='active' className='checkbox-react'>
                    <i className='fa fa-check' />
                  </span>
                </div>
              </form>
            </div>
          </div> */}
          {/* <div className='col-md-12'>
            <div className='box box-success'>
              <div className='box-body'>
                <div className='pull-left'>
                  <a href='/admin/account' className='btn btn-danger btn-xs'>Huỷ</a>
                </div>

                <div className='pull-right'>
                  <input className='btn btn-success btn-xs' disabled={!this.state.actionValid} onClick={(e) => { this.submitForm(e, '/admin/account/form', '/admin/account') }} id='ck' type='submit' defaultValue='Lưu' />
                </div>

                <div className='clearfix' />
              </div>
            </div>
          </div> */}

        </div>
      </section>
    )
  }
}

const FormBox = withFormBehaviors(Form, Model)

class FormWrapper extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.currentUser
    }
  }
  render () {
    return <FormBox data={this.state.data} api={this.props.api} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api,
  currentUser: c.data.currentUser
}))
