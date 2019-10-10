import React from 'react'
import async from 'async'
import _ from 'lodash'
import { SketchPicker } from 'react-color'

import Model from './model'
import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import config from '../../../../config'
import STORELINK from '../../../helper/link'
import Select from '../../../component/control/select'
import TinyMCE from '../../../helper/tinyMCE'
import Size from './size'

let domain = config.server.domain
const LINK = STORELINK.PRODUCTLINK

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      color: ''
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.uploadGallery = this.uploadGallery.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteGallery = this.deleteGallery.bind(this)
    this.handleChangeColorComplete = this.handleChangeColorComplete.bind(this)
    this.color = ''
  }

  handleChangeColorComplete (color, event) {
    this.color = color.hex
  }

  deleteGallery (e) {
    var img = e.target.getAttribute('data-img')
    const galleries = _.get(this.props.model, 'gallery.value')
    var gallery = galleries ? JSON.parse(galleries) : []
    if (!gallery.includes(img)) return
    const newGallery = _.pull(gallery, img)
    this.props.onInputChange(null, { name: 'gallery', value: JSON.stringify(newGallery) })
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

  uploadGallery (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')
    var {gallery} = this.props.model
    this.props.api.file.upload(true, files, name, folder, (err, resp) => {
      if (err) return alert('upload gallery error')
      var galleries = []
      if (gallery.value) galleries = JSON.parse(gallery.value)
      resp.forEach(el => galleries.push(el.img))
      this.props.onInputChange(null, { name, value: JSON.stringify(galleries) })
    })
  }

  handleSubmit () {
    this.props.handleSubmitSingle((data) => {
      data.gallery = data.gallery ? JSON.parse(data.gallery) : []
      if (!this.props.data) {
        this.props.api.product.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          return this.props.history.push(LINK.GRID)
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.product.update(dt, (err, resp) => {
          if (err) return alert('update fail')
          return this.props.history.push(LINK.GRID)
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  componentDidMount () {
    let {content} = this.props.model
    TinyMCE.init('content', this.props.onInputChange, () => {
      if (content.value) tinymce.activeEditor.setContent(content.value)
    })
  }

  render () {
    let { image, gallery, title, code, price, priceSale, description, content, isNewProduct, categoryId, isHot, isActive, altImage, metaTitle, metaDescription } = this.props.model
    let {onInputChange, categories} = this.props
    var linkImg = (image.value) ? domain + image.value : 'http://placehold.it/250x150'
    var galleries = []
    if (gallery.value) {
      galleries = JSON.parse(gallery.value)
    }
    return (
      <FormLayoutDefault
        className='col-md-12'
        title='Create Product'
        linkCancleBtn='/product'
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
        isSubmit
      >
        <form role='form'>
          <div className='box-body'>
            {/* <SketchPicker onChangeComplete={this.handleChangeColorComplete} />
            <a className='btn btn-app'>
              <i class='fa fa-save' /> Save
            </a>
            <div>
              <span><a className='product-color' /><i class='fa fa-remove' /></span>
              <span><a className='product-color' /><i class='fa fa-remove' /></span>
              <span><a className='product-color' /><i class='fa fa-remove' /></span>
            </div> */}
            <Size />
            <div className='box-body box-profile' style={{ width: '250px' }}>
              <img style={{ width: '100%' }} src={linkImg} />
              <h3 className='profile-username text-center'>Image Primary</h3>
              <Field field={image}>
                <div className='upload-image'>
                  <button className='btn btn-block btn-success'>upload Image</button>
                  <input data-name='image' data-folder='product' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
            </div>

            <div className='timeline-item'>
              <Field field={gallery}>
                <div className='upload-image' style={{ width: '100px' }}>
                  <button className='btn btn-block btn-success'>Gallery</button>
                  <input data-name='gallery' data-folder='product' multiple className='btn btn-block btn-success' type='file' name='uploadsImage[]' onChange={this.uploadGallery} />
                </div>
              </Field>

              <h3 className='timeline-header'>uploaded gallery</h3>

              <div className='timeline-body'>
                {galleries.map((gallery, key) => <a key={key}><img width='150' src={`${domain}/${gallery}`} alt='...' className='margin' /><i data-img={gallery} onClick={this.deleteGallery} className='fa fa-remove' /></a>)}
              </div>
            </div>

            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={onInputChange} defaultValue={title.value} />
            </Field>

            <Field field={code}>
              <input type='text' className='form-control' placeholder={code.placeholder} onChange={onInputChange} defaultValue={code.value} />
            </Field>

            <Field field={categoryId}>
              <Select isSelected={categoryId.value} name='categoryId' options={categories} classSelect='select2' onChange={onInputChange} />
            </Field>

            <Field field={price}>
              <input type='text' className='form-control' placeholder={price.placeholder} onChange={onInputChange} defaultValue={price.value} />
            </Field>

            <Field field={priceSale}>
              <input type='text' className='form-control' placeholder={priceSale.placeholder} onChange={onInputChange} defaultValue={priceSale.value} />
            </Field>

            <Field field={description}>
              <div>
                <textarea style={{width: '100%', height: '200px'}} name='description' value={description.value} onChange={onInputChange} />
              </div>
            </Field>

            <Field field={content}>
              <div>
                <textarea className='editor' />
              </div>
            </Field>

            <Field field={isNewProduct}>
              <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'isNewProduct', value: !isNewProduct.value })}>
                {isNewProduct.value && <i className='fa fa-check' />}
              </span>
            </Field>

            <Field field={isHot}>
              <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'isHot', value: !isHot.value })}>
                {isHot.value && <i className='fa fa-check' />}
              </span>
            </Field>

            <Field field={isActive}>
              <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'isActive', value: !isActive.value })}>
                {isActive.value && <i className='fa fa-check' />}
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
      categories: []
    }
  }

  componentDidMount () {
    let {match} = this.props
    if (!match) return
    let {params} = match

    const data = (cb) => {
      this.props.api.product.get({id: params.id}, (err, data) => {
        if (err) return cb(err)
        data.gallery = JSON.stringify(data.gallery)
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
      categories((err, data) => {
        if (err) return
        this.setState({ categories: data })
      })
    } else {
      async.parallel({data, categories}, (err, resp) => {
        if (err) return
        this.setState({ data: resp.data, categories: resp.categories })
      })
    }
  }
  render () {
    return <FormBox data={this.state.data} api={this.props.api} categories={this.state.categories} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
