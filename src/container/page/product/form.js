import React, {useEffect, useState, forwardRef} from 'react'
import async from 'async'

import { Basic } from 'form-layout'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import STORELINK from '../../../helper/link'
import { withContainer } from '../../../context'
import modelForm from './model'
import conf from '../../../../config'
import useReactRouter from 'use-react-router'

const domain = conf.server.domain

const LINK = STORELINK.PRODUCTLINK

const FormHandle = (props) => {
  const {isAdd, data, categories, api} = props
  const { history } = useReactRouter()
  const [model] = useModel(modelForm, isAdd ? null : data)

  const {image, gallery, title, code, price, priceSale,
    categoryId, description, content, altImage, metaTitle,
    metaDescription, isActive, isNewProduct, isHot, inStock} = model

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    const formData = model.data
    if (isAdd) {
      props.api.product.insert(formData, (err, resp) => {
        if (err) return alert('save fail')
        return window.location.href = LINK.GRID
      })
    } else {
      let dt = formData
      dt.id = props.data._id
      props.api.product.update(dt, (err, resp) => {
        if (err) return alert('update fail')
        return window.location.href = LINK.GRID
      })
    }
  }

  let activeChecked = isActive.value
  let newProductChecked = isNewProduct.value
  let hotChecked = isHot.value
  let inStockChecked = inStock.value
  var linkImg = (image && image.value) ? domain + '/' + image.value : 'http://placehold.it/250x150'
  return <Form
    Layout={Basic}
    title='Product Form'
    cancle={LINK.GRID}
    onSubmit={onSubmit}
    formValid={model.valid}
  >
    <div className='row'>
      <div className='col-md-4'>
        <Field.FileImage id='pro-modal-upload' name={image.name} field={image} value={linkImg} title='Upload Image' api={api} onChange={onChange} />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-12'>
        <Field.FileGalleries id='pro-modal-galleries' value={gallery.value} name={gallery.name} field={gallery} title='Upload Image' api={api} onChange={onChange} />
      </div>
    </div>
    <div className='row'>
      <div className='col-md-6'>
        <Field.Input field={title} defaultValue={title.value} name={title.name} id='pro-title-id' placeholder={title.placeholder} className='form-control' onChange={onChange} />
        <Field.Input field={code} defaultValue={code.value} name={code.name} id='pro-code-id' placeholder={code.placeholder} className='form-control' onChange={onChange} />
        <Field.Select field={categoryId} name={categoryId.name} selectedValue={categoryId.value} options={categories} id='pro-categoryId-id' className='form-control' onChange={onChange} />
        <Field.Input field={price} defaultValue={price.value} name={price.name} id='pro-price-id' placeholder={price.placeholder} className='form-control' onChange={onChange} />
        <Field.Input field={priceSale} defaultValue={priceSale.value} name={priceSale.name} id='pro-priceSale-id' placeholder={priceSale.placeholder} className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-6'>
        <Field.Input field={altImage} defaultValue={altImage.value} name={altImage.name} id='pro-altImage-id' placeholder={altImage.placeholder} className='form-control' onChange={onChange} />
        <Field.Input field={metaTitle} defaultValue={metaTitle.value} name={metaTitle.name} id='pro-metaTitle-id' placeholder={metaTitle.placeholder} className='form-control' onChange={onChange} />
        <Field.Area field={metaDescription} rows='4' name={metaDescription.name} defaultValue={metaDescription.value} id='pro-description-id' className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-12'>
        <Field.Area field={description} rows='6' name={description.name} defaultValue={description.value} id='pro-description-id' className='form-control' onChange={onChange} />
        <Field.Tiny field={content} id='product-content' name={content.name} defaultValue={content.value} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <Field.CheckBox field={isActive} id='pro-active-id' defaultChecked={activeChecked} value={isActive.value} name={isActive.name} text={isActive.text} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <Field.CheckBox field={isNewProduct} id='pro-isNewProduct-id' defaultChecked={newProductChecked} value={isNewProduct.value} name={isNewProduct.name} text={isNewProduct.text} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <Field.CheckBox field={isHot} id='pro-isHot-id' defaultChecked={hotChecked} value={isHot.value} name={isHot.name} text={isHot.text} onChange={onChange} />
      </div>
      <div className='col-md-2'>
        <Field.CheckBox field={inStock} id='pro-isHot-id' defaultChecked={inStockChecked} value={inStock.value} name={inStock.name} text={inStock.text} onChange={onChange} />
      </div>
    </div>
  </Form>
}

const FormWrapper = forwardRef((props, ref) => {
  const {match, api} = props
  let {params} = match

  let [formData, setFormData] = useState(null)

  useEffect(() => {
    const categories = (cb) => {
      props.api.category.getAll({}, (err, data) => {
        if (err) return cb(err)
        let options = data.map((el) => ({key: el._id, text: el.title, value: el._id}))
        return cb(null, options)
      })
    }

    const data = (cb) => {
      props.api.product.get({id: params.id}, (err, dt) => {
        if (err) return cb(err)
        return cb(null, dt)
      })
    }

    if (params.id === 'add') {
      categories((err, cats) => {
        if (err) return
        setFormData({ categories: cats, data: null, isAdd: true })
      })
    } else {
      async.parallel({ data, categories }, (err, resp) => {
        if (err) return
        const { data, categories } = resp
        setFormData({ categories, data, isAdd: false })
      })
    }
  }, [params])
  return formData && <FormHandle isAdd={formData.isAdd} categories={formData.categories} data={formData.data} api={api} />
})

export default withContainer(React.memo(FormWrapper), (c) => ({
  api: c.api
}))
