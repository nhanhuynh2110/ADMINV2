import React from 'react'
import _ from 'lodash'

import Model from './model'
import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import config from '../../../../config'
import STORELINK from '../../../helper/link'

let domain = config.server.domain
const LINK = STORELINK.PRODUCTLINK

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.uploadGallery = this.uploadGallery.bind(this)
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

  uploadGallery (e) {
    this.props.api.file.upload(true, files, name, folder, (err, resp) => {

      console.log('resp', resp)
      // if (err) this.props.onInputChange(null, { name, value: null })
      // else this.props.onInputChange(null, {name, value: resp.img})
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

  render () {
    let { image, imageGallery, title, code, price, priceSale, description, isNewProduct, isHot, isActive } = this.props.model
    let {onInputChange} = this.props
    var linkImg = (image.value) ? domain + image.value : 'http://placehold.it/250x150'
    var galleries = []
    if (imageGallery.value) {
      galleries = imageGallery.value
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

            <div className='box-body box-profile' style={{ width: '250px' }}>
              <img style={{ width: '100%' }} src={linkImg} />
              <h3 className='profile-username text-center'>Image Primary</h3>
              <Field field={image}>
                <div className='upload-image'>
                  <button className='btn btn-block btn-success'>upload Image</button>
                  <input data-name='image' data-folder='categories' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                </div>
              </Field>
            </div>

            <div className='timeline-item'>
              <Field field={imageGallery}>
                <div className='upload-image' style={{ width: '100px' }}>
                  <button className='btn btn-block btn-success'>Gallery</button>
                  <input data-name='imageGallery' data-folder='gallery' multiple id='upload-input' className='btn btn-block btn-success' type='file' name='uploadsImage[]' onChange={this.uploadGallery} />
                </div>
              </Field>

              <h3 className='timeline-header'><a href='#'></a> uploaded gallery</h3>

              <div className='timeline-body'>
                {galleries.map((gallery, key) => <a key={key}><img width='150' src={`${domain}/${gallery}`} alt='...' className='margin' /><i className='fa fa-remove' /></a>)}
                <a><img width='150' src={`https://www.thebeautysalon.ie/wp-content/uploads/2019/01/AGELESS_COLLECTION_clearbckgrnd-1024x438.png`} alt='...' className='margin' /><i className='fa fa-remove' /></a>
              </div>
            </div>

            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={onInputChange} defaultValue={title.value} />
            </Field>

            <Field field={code}>
              <input type='text' className='form-control' placeholder={code.placeholder} onChange={onInputChange} defaultValue={code.value} />
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
    if (!params.id) return false
    this.props.api.category.get({id: params.id}, (err, data) => {
      if (err) return
      this.setState({ data })
    })
  }
  render () {
    return <FormBox data={this.state.data} api={this.props.api} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
