import React from 'react'
import _ from 'lodash'
import async from 'async'

import Model from './model2'
import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import config from '../../../../config'
import STORELINK from '../../../helper/link'
import Select from '../../../component/control/select'
import FileManager from 'lib-module/formControl/control/fileManager'

let domain = config.server.domain
const LINK = STORELINK.CATEGORYLINK

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeFileManager = this.onChangeFileManager.bind(this)
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
        this.props.api.category.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          return this.props.history.push(LINK.GRID)
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.category.update(dt, (err, resp) => {
          if (err) return alert('update fail')
          return this.props.history.push(LINK.GRID)
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  onChangeFileManager (resp) {
    this.props.onInputChange(null, { name: 'img', value: resp.path })
  }

  render () {
    let { img, title, description, parentId, isActive, isHome, altImage, metaTitle, metaDescription } = this.props.model
    let {parents, onInputChange} = this.props
    var linkImg = (img.value) ? domain + '/' + img.value : 'http://placehold.it/250x150'
    return (
      <FormLayoutDefault
        title='Create Category'
        linkCancleBtn='/category'
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
        isSubmit
      >
        <form role='form'>
          <div className='box-body'>

            <img id='img' style={{ width: '250px', marginBottom: '20px' }} src={linkImg} />
            <br />
            <FileManager title='Upload Image' api={this.props.api} onChange={this.onChangeFileManager} />

            {/* <div className='box-body box-profile' style={{ width: '250px' }}>
              <img style={{ width: '100%' }} src={linkImg} />
              <h3 className='profile-username text-center'>Image category</h3>
              <Field field={img}>
                <div className='upload-image'>
                  <button className='btn btn-block btn-success'>Image</button>
                  <input data-name='img' data-folder='categories' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
            </div> */}

            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={onInputChange} defaultValue={title.value} />
            </Field>

            <Field field={parentId}>
              <Select name='parentId' isSelected={parentId.value} options={parents} classSelect='select2' onChange={onInputChange} />
            </Field>

            <Field field={description}>
              <div>
                <textarea style={{width: '100%', height: '200px'}} name='description' value={description.value} onChange={onInputChange} />
              </div>
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

            <Field field={metaDescription}>
              <input type='text' className='form-control' placeholder={metaDescription} onChange={onInputChange} defaultValue={(metaDescription) ? metaDescription.value : ''} />
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
      parents: []
    }
  }

  componentDidMount () {
    let {match} = this.props
    if (!match) return
    let {params} = match
    const parents = (cb) => {
      this.props.api.category.getParents({}, (err, resp) => {
        if (err) return cb(err)
        let data = resp.map(el => ({ text: el.title, value: el._id }))
        return cb(null, data)
      })
    }

    const data = (cb) => {
      this.props.api.category.get({id: params.id}, (err, resp) => {
        if (err) return cb(err)
        return cb(null, resp)
      })
    }

    if (params.id === 'add') {
      parents((err, data) => {
        if (err) return
        this.setState({ parents: data })
      })
    } else {
      async.parallel({ data, parents }, (err, resp) => {
        if (err) return
        const { data, parents } = resp
        _.remove(parents, {
          value: data._id
        })
        this.setState({ data, parents })
      })
    }
  }
  render () {
    return <FormBox data={this.state.data} parents={this.state.parents} api={this.props.api} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
