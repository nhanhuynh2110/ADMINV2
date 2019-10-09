/* global _, tinymce */

import React from 'react'
import Model from './model'
import Field from '../../../component/form/field'
import _ from 'lodash'
import STORELINK from '../../../helper/link'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import conf from '../../../../config'

const domain = conf.server.domain

const LINK = STORELINK.ADVERTISELINK
class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    // this.state.TinyMCE = false
  }
  uploadFile (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')

    const {onInputChange} = this.props

    this.props.api.file.upload(false, files, name, folder, (err, resp) => {
      if (err) onInputChange(null, { name, value: null })
      else onInputChange(null, {name, value: resp.img})
    })
  }

  handleSubmit () {
    this.props.handleSubmitSingle((data) => {
      if (!this.props.data) {
        this.props.api.advertise.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          this.props.history.push(LINK.GRID)
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.advertise.update(dt, (err, resp) => {
          if (err) alert('update fail')
          this.props.history.push(LINK.GRID)
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  componentDidMount () {
  }

  render () {
    const {onInputChange, model} = this.props
    let { title, img, isActive, isHome, altImage, metaTitle } = model
    var linkImg = (img.value) ? domain + img.value : 'http://placehold.it/250x150'
    return (
      <FormLayoutDefault
        title='Create Advertise'
        linkCancleBtn='/advertise'
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
        isSubmit
      >
        <form role='form'>
          <div className='box-body'>
            <div className='box-body box-profile' style={{ width: '250px' }}>
              <img style={{ width: '100%' }} src={linkImg} />
              <h3 className='profile-username text-center'>Image</h3>
              <Field field={img}>
                <div className='upload-image'>
                  <button className='btn btn-block btn-success'>Image</button>
                  <input data-name='img' data-folder='advertise' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
            </div>

            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={onInputChange} defaultValue={title.value} />
            </Field>

            <Field field={isActive}>
              <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'isActive', value: !isActive.value })}>
                {isActive.value && <i className='fa fa-check' />}
              </span>
            </Field>
            <Field field={isHome}>
              <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'isHome', value: !isHome.value })}>
                {isHome.value && <i className='fa fa-check' />}
              </span>
            </Field>

            <label>SEO META</label>
            <Field field={altImage}>
              <input type='text' className='form-control' placeholder={altImage.placeholder} onChange={onInputChange} defaultValue={(altImage) ? altImage.value : ''} />
            </Field>

            <Field field={metaTitle}>
              <input type='text' className='form-control' placeholder={metaTitle.placeholder} onChange={onInputChange} defaultValue={(metaTitle) ? metaTitle.value : ''} />
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
      data: null
    }
  }

  componentDidMount () {
    let {match} = this.props
    if (!match) return
    let {params} = match
    if (!params.id || params.id === 'add') return false
    this.props.api.advertise.get({id: params.id}, (err, data) => {
      if (err) return
      this.setState({ data })
    })
  }
  render () {
    return <FormBox data={this.state.data} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
