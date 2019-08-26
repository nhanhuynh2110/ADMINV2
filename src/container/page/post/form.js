/* global _ */

import React from 'react'
import async from 'async'

import Model from './model'
import Field from '../../../component/form/field'
import _ from 'lodash'
import STORELINK from '../../../helper/link'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import Select from '../../../component/control/select'
import TinyMCE from '../../../helper/tinyMCE'

import config from '../../../../config'

let domain = config.server.domain
const LINK = STORELINK.POSTLINK

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.state.TinyMCE = false
  }

  uploadFile (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')

    this.props.api.file.upload(files, name, folder, (err, resp) => {
      if (err) this.props.onInputChange(null, { name, value: null })
      else this.props.onInputChange(null, {name, value: resp.img})
    })
  }

  handleSubmit () {
    this.props.handleSubmitSingle((data) => {
      if (!this.props.data) {
        this.props.api.post.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          this.props.history.push(LINK.GRID)
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.post.update(dt, (err, resp) => {
          if (err) alert('update fail')
          this.props.history.push(LINK.GRID)
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  componentDidMount () {
    let {description} = this.props.model
    TinyMCE.init('description', this.props.onInputChange, () => {
      if (description.value) tinymce.activeEditor.setContent(description.value)
    })
  }

  render () {
    let { categories, onInputChange } = this.props
    let { image, title, introTitle, isActive, description, categoryPostId } = this.props.model

    var linkImg = (image.value) ? domain + image.value : 'https://img7.androidappsapk.co/115/7/3/a/com.profile.admires_stalkers_unknown.png'
    return (
      <FormLayoutDefault
        title='Create Post'
        linkCancleBtn={LINK.GRID}
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
      >
        <form role='form'>
          <div className='box-body'>

            <div className='box-body box-profile'>
              <img className='profile-user-img img-responsive img-circle' src={linkImg} alt='User profile picture' />
              <h3 className='profile-username text-center'>Image category</h3>
              <Field field={image}>
                <div className='upload-image'>
                  <button className='btn btn-block btn-success'>Image</button>
                  <input data-name='image' data-folder='post' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
            </div>

            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={onInputChange} defaultValue={title.value} />
            </Field>
            
            <Field field={introTitle}>
              <input type='text' className='form-control' placeholder={introTitle.placeholder} onChange={onInputChange} defaultValue={introTitle.value} />
            </Field>

            <Field field={categoryPostId}>
              <Select isSelected={categoryPostId.value} name='categoryPostId' options={categories} classSelect='select2' onChange={(e) => onInputChange(null, {name: 'categoryPostId', value: e.target.value})} />
            </Field>

            <Field field={description}>
              <div>
                <textarea className='editor' />
              </div>
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
      data: null,
      categories: []
    }
  }

  componentDidMount () {
    let {match} = this.props
    if (!match) return
    let {params} = match

    const data = (cb) => {
      this.props.api.post.get({id: params.id}, (err, data) => {
        if (err) return cb(err)
        return cb(null, data)
      })
    }

    const categories = (cb) => {
      this.props.api.category.getAll({}, (err, data) => {
        if (err) return cb(err)
        let options = data.map((el) => ({text: el.title, value: el._id}))
        return cb(null, options)
      })
    }

    if (params.id === 'add') {
      categories((err, data) => this.setState({ categories: data }))
    } else {
      async.parallel({data, categories}, (err, resp) => {
        if (err) return
        this.setState({ data: resp.data, categories: resp.categories })
      })
    }
  }
  render () {
    return <FormBox data={this.state.data} categories={this.state.categories} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
