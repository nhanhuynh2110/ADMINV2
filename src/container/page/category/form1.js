import React from 'react'
import { connect } from 'react-redux'
import { callAPI } from '../../../../helper/APIMethod'
import SuperForm from '../super_form.jsx'
import Model from './model'
import APPCONST from '../../../../helper/const'

class Form extends SuperForm {
  constructor (props) {
    super(props, Model)
    this.state.listManagerHome = []
    this.state.action = 'create'
    this.redirectSubmit = !(typeof this.props.fClose === 'function')
  }

  callData (code, cb) {
    var self = this
    var state = this.state
    if (code) {
      callAPI({
        type: 'get', link: APPCONST.BASE_API, params: { api: `/api/admin/category/${code}` }
      }, (result) => {
        if (result) {
          if (result.status === 200) {
            state.action = 'edit'
            state.fields.code.value = code
            state.fields.title.value = result.data.title
            state.fields.logo.value = result.data.logo
            state.fields.is_active.value = result.data.is_active
            state.fields.is_home.value = result.data.is_home
            state.fields.is_delete.value = result.data.is_delete
            state.fields.home_manage_code.value = result.data.home_manage_code
            self.checkValidate((isvalid) => cb(null, state))
          } else {
            let msg = 'data is empty'
            return cb(msg)
          }
        } else return cb(null, state)
      })
    } else return cb(null, state)
  }

  componentDidMount () {
    var self = this
    if (typeof this.props.fClose === 'function') {
      let code = this.props.code
      self.callData(code, (err, state) => {
        if (err) return
        self.setState(state)
      })
    } else {
      if (this.props.match && this.props.match.params && this.props.match.params.code) {
        let code = this.props.match.params.code
        self.callData(code, (err, state) => {
          if (err) return
          self.setState(state)
        })
      }
    }
  }

  render () {
    var isClosePopup = false
    if (typeof this.props.fClose === 'function') isClosePopup = true
    return (
      <section className='content'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Tạo Danh Mục</h3>
              </div>
              <form role='form'>
                <div className='box-body'>
                  <div className='form-group'>
                    <label>Tiêu Đề</label>
                    <input type='text' data-name={this.state.fields.title.name} value={this.state.fields.title.value || ''} onChange={this.handleInputDelayed} className='form-control' placeholder='Enter Title' />
                    {(this.state.fields.title.isvalid === false) ? <span className='err-msg'>{this.state.fields.title.errMsg}</span> : ''}
                  </div>
                  {
                    this.permissions && this.permissions.active
                      ? <div className='form-group'>
                        <span data-name={this.state.fields.is_active.name} className='checkbox-react' onClick={this.changeDataCheckbox}>
                          {this.state.fields.is_active.value === 1 ? <i className='fa fa-check' /> : ''}
                        </span>
                        Kích Hoạt
                      </div> : null
                  }
                  <div className='form-group'>
                    <span data-name={this.state.fields.is_home.name} className='checkbox-react' onClick={this.changeDataCheckbox}>
                      {this.state.fields.is_home.value === 1 ? <i className='fa fa-check' /> : ''}
                    </span>
                    Hiển thị trang chủ
                  </div>
                </div>
              </form>
            </div>
            <div className='box box-success'>
              <div className='box-body'>
                <div className='pull-left'>
                  {(isClosePopup) ? <a onClick={() => this.clearData(false)} className='btn btn-danger btn-xs'>Huỷ</a> : <a href='/admin/category' className='btn btn-danger btn-xs'>Huỷ</a>}

                </div>

                <div className='pull-right'>
                  <input className='btn btn-success btn-xs' disabled={!this.state.actionValid} onClick={(e) => { this.submitForm(e, '/api/admin/category/form', '/admin/category') }} id='ck' type='submit' defaultValue='Lưu' />
                </div>

                <div className='clearfix' />
              </div>
            </div>
          </div>
          <div className='col-md-4' />
        </div>
      </section>
    )
  }
}
export default connect((state) => {
  const currentUser = state.currentUser
  return { currentUser }
})(Form)
