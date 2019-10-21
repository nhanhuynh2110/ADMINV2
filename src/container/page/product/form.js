/* global _ */

import React, {useEffect, useState, forwardRef} from 'react'
import async from 'async'

import { Product } from 'form-layout'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import STORELINK from '../../../helper/link'
import { withContainer } from '../../../context'
import modelForm from './model'
import conf from '../../../../config'
import ModalSize from './sizeModal'
import ModalColor from './colorModal'

const domain = conf.server.domain

const LINK = STORELINK.PRODUCTLINK

const FormHandle = (props) => {
  const {isAdd, data, categories, api} = props
  const [model] = useModel(modelForm, isAdd ? null : data)

  const {image, gallery, title, code, price, priceSale,
    categoryId, description, content, altImage, metaTitle,
    metaDescription, isActive, isNewProduct, isHot, inStock, size} = model

    const [selectCurrent, setSelectCurrent] = React.useState({
      selectSize: null,
      selectColor: null,
      id: null
    })

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onChangeSize = ({name, value}) => {
    let sizeValue = _.clone(size.value) || []
    sizeValue.push({ name: value, colors: [] })
    model.validate(name, sizeValue).then(() => model.setValue(name, sizeValue))
    if (!selectCurrent.selectSize) {
      setSelectCurrent({
        selectSize: sizeValue[0],
        selectColor: sizeValue[0].colors && sizeValue[0].colors.length > 0 ? sizeValue[0].colors[0] : null
      })
    }
  }

  const deleteSize = (sizeName) => {
    let sizeValueOld = _.clone(size.value)
    let selectCurrentOld = _.clone(selectCurrent)
    let selectSizeCurrent = _.clone(selectCurrent.selectSize)
    
    let sizeValue = sizeValueOld.filter(el => el.name !== sizeName)
    if (sizeName === selectSizeCurrent.name) {
      
      if (sizeValue.length > 0) {
        
        const newSelectedSize = sizeValue && sizeValue.length > 0 ? sizeValue[0] : null
        const newSelectColor = newSelectedSize && newSelectedSize.colors && newSelectedSize.colors.length > 0 ? newSelectedSize.colors[0] : null

        selectCurrentOld.selectSize = newSelectedSize
        selectCurrentOld.selectColor = newSelectColor
        setSelectCurrent(selectCurrentOld)
        model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
      }
    } else {
      model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
    }
  }

  const deleteColor = (colorName) => {
    let sizeValue = _.clone(size.value)
    let selectCurrentOld = _.clone(selectCurrent)
    let selectSizeCurrent = _.clone(selectCurrent.selectSize)

    const newColors = selectSizeCurrent.colors.filter(el => el.color !== colorName)
    selectSizeCurrent.colors = newColors
    selectCurrentOld.selectSize = selectSizeCurrent
    if (colorName === selectCurrent.selectColor.color) {
      selectCurrentOld.selectColor = newColors && newColors.length > 0 ? newColors[0] : null
    } else {
      selectCurrentOld.selectColor = selectCurrent.selectColor
    }
    setSelectCurrent(selectCurrentOld)
    const index = sizeValue.findIndex(el => el.name === selectSizeCurrent.name)
    sizeValue[index] = selectSizeCurrent
    model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))

  }

  const onChangeColor = ({ value, name, selectSize }) => {
    const sizeValue = _.clone(size.value)
    var index = _.findIndex(sizeValue, selectCurrent.selectSize)

    let sizes = sizeValue[index]
    let colors = sizes.colors
    colors.push({ color: value, images: [] })
    sizes.colors = colors

    sizeValue[index] = sizes

    if (!selectCurrent.selectColor || selectCurrent.selectColor.length <= 0) {
      setSelectCurrent({
        selectSize: selectCurrent.selectSize,
        selectColor: sizeValue[index].colors[0]
      })
    }
    model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
  }

  const onSelectSize = (sizeName) => {
    const sizeValue = _.clone(size.value)
    const selected = sizeValue.find(el => el.name === sizeName)
    setSelectCurrent({
      selectSize: selected,
      selectColor: selected.colors ? selected.colors[0] : null
    })
  }

  const onSelectColor = (e) => {
    const color = e.currentTarget.getAttribute('data-color')
    const newSelectColor = selectCurrent.selectSize.colors.find(el => el.color === color)
    setSelectCurrent({
      selectSize: selectCurrent.selectSize,
      selectColor: newSelectColor
    })
    // setSelectColor(selectColor)
  }

  const onChangeImages = ({paths}) => {
    const sizeValue = _.clone(size.value)
    const selectSizeCurrent = _.clone(selectCurrent.selectSize)
    const selectCl = _.clone(selectCurrent.selectColor)
    const imgs = selectCl.images
    selectCl.images.push()
    const imagesArr = paths.map(el => {
      return {
        mainImage: el,
        sliderImage: '',
        sliderDetailImage: '',
        listImage: ''
      }
    })
    selectCl.images = [...imgs, ...imagesArr]
    const index = selectSizeCurrent.colors.findIndex(el => el.color === selectCl.color)
    selectSizeCurrent.colors[index] = selectCl

    const selectSizeCurrentIndex = sizeValue.findIndex(el => el.name === selectSizeCurrent.name)
    sizeValue[selectSizeCurrentIndex] = selectSizeCurrent
    setSelectCurrent({
      selectSize: selectSizeCurrent,
      selectColor: selectCl
    })
    // setSelectSize(selectSizeCurrent)
    // setSelectColor(selectCl)

    model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = model.data
    if (!formData.size) formData.size = []
    if (isAdd) {
      props.api.product.insert(formData, (err, resp) => {
        if (err) return alert('save fail1')
        window.location.href = LINK.GRID
      })
    } else {
      let dt = formData
      dt.id = props.data._id
      props.api.product.update(dt, (err, resp) => {
        if (err) return alert('update fail2')
        window.location.href = LINK.GRID
      })
    }
  }

  React.useEffect(() => {
    if (size.value) {
      setSelectCurrent({
        selectSize: size.value && size.value.length > 0 ? size.value[0] : null,
        selectColor: size.value && size.value[0] && size.value[0].colors ? size.value[0].colors[0] : null
      })
    }
  }, [size])

  let activeChecked = isActive.value
  let newProductChecked = isNewProduct.value
  let hotChecked = isHot.value
  let inStockChecked = inStock.value
  var linkImg = (image && image.value) ? domain + '/' + image.value : 'http://placehold.it/250x150'

  
  return <Form
    Layout={Product}
    title='Product Form'
    cancle={LINK.GRID}
    onSubmit={onSubmit}
    formValid={model.valid}
  >
    <div className='row'>
      <div className='col-md-12'>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='box-title'>Info</h3>
          </div>
          <div className='box-body'>
            <div className='row'>
              <div className='col-md-3'>
                <Field.FileImage id='pro-modal-upload' name={image.name} field={image} value={linkImg} title='Upload Image' api={api} onChange={onChange} />
              </div>
              <div className='col-md-9'>
                <Field.Input field={title} defaultValue={title.value} name={title.name} id='pro-title-id' placeholder={title.placeholder} className='form-control' onChange={onChange} />
                <Field.Input field={code} defaultValue={code.value} name={code.name} id='pro-code-id' placeholder={code.placeholder} className='form-control' onChange={onChange} />

                <div className='row'>
                  <div className='col-md-6'>
                    <Field.Input field={price} defaultValue={price.value} name={price.name} id='pro-price-id' placeholder={price.placeholder} className='form-control' onChange={onChange} />
                  </div>
                  <div className='col-md-6'>
                    <Field.Input field={priceSale} defaultValue={priceSale.value} name={priceSale.name} id='pro-priceSale-id' placeholder={priceSale.placeholder} className='form-control' onChange={onChange} />
                  </div>
                  <div className='col-md-12 groups-size'>
                    <div className='form-group'>
                      <label>Size</label>
                      {size.value &&  selectCurrent.selectSize && size.value.map((el, k) => {
                        const className = el.name === selectCurrent.selectSize.name ? 'btn bg-default margin btn-size-active' : 'btn bg-default margin'
                        return <span key={el.name} className='position-relative display-inline-block'>
                          <button data-size={el.name} onClick={() => onSelectSize(el.name)} type='button' className={className}>
                            {el.name}
                          </button>
                          <span data-key={k} onClick={() => deleteSize(el.name)} className='badge bg-green badge-size-remove'><i className='fa fa-remove' /></span>
                        </span>
                      })}
                      <ModalSize name={size.name} onSubmit={onChangeSize} />
                    </div>

                    <div className='form-group'>
                      <label>Color follow size</label>
                      {selectCurrent.selectSize && selectCurrent.selectSize.colors && selectCurrent.selectSize.colors.length > 0 && selectCurrent.selectSize.colors.map((el, k) => {
                        const className = el.color === selectCurrent.selectColor.color ? 'color-by-size color-by-size-active' : 'color-by-size'
                        return <span key={k} className='position-relative display-inline-block'>
                            <a data-color={el.color} className={className} onClick={onSelectColor} style={{ backgroundColor: el.color }} />
                            <span onClick={() => deleteColor(el.color)} className='badge bg-green badge-color-remove'><i className='fa fa-remove' /></span>
                          </span>
                      })}
                      {selectCurrent.selectSize && <ModalColor onSubmit={onChangeColor} name={size.name} selectSize={selectCurrent.selectSize} />}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div className='row'>
      <div className='col-md-12'>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='box-title'>Gallery Image</h3>
            {/* <button className='btn btn-success pull-right'>Upload Images</button> */}
            {selectCurrent.selectColor && <Field.FileManager
              multiple
              onChange={onChangeImages}
              api={props.api}
              triggerId={'size-color-image'}
              trigger={<button type='button' data-target={`#size-color-image`} data-toggle='modal' className='btn btn-success pull-right'>Gallery Image &nbsp; <i className='fa fa-plus' /></button>}
            />}
          </div>
          <div className='box-body'>
            <div className='row'>
              {selectCurrent.selectColor && selectCurrent.selectColor.images && selectCurrent.selectColor.images.length > 0 && selectCurrent.selectColor.images.map((el, k) => {
                return (
                  <div key={k} className='col-xs-6 col-xm-3 col-md-3 col-lg-2 size-image-item' style={{ backgroundImage: `url('${domain}/${el.mainImage}')` }} />
                )
              })}
            </div>
          </div>
        </div>
        {/* <Field.FileGalleries id='pro-modal-galleries' value={gallery.value} name={gallery.name} field={gallery} title='Upload Image' api={api} onChange={onChange} /> */}
        <div className='timeline-body'>
          {/* {selectColor && <Field.FileManager
            multiple
            api={props.api}
            onChange={onChangeImages}
            triggerId={'size-color-image'}
            trigger={<a data-target={`#size-color-image`} data-toggle='modal' className='add-galleries-icon'><i className='fa fa-plus' /></a>}
          />} */}

          {/* {value && value.map(el => {
            return <a key={el}><img src={`${domain}/${el}`} alt='...' className='margin' /><i data-img={el} onClick={deleteImage} className='fa fa-remove' /></a>
          })} */}
        </div>

      </div>
    </div>

    {/* <div className='row'>
      <div className='col-md-12'>
        <Size />
      </div>
    </div> */}
    <div className='row'>
      <div className='col-md-12'>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='box-title'>Content</h3>
          </div>
          <div className='box-body'>
            <div className='row'>
              <div className='col-md-12'>
                <Field.Select field={categoryId} name={categoryId.name} selectedValue={categoryId.value} options={categories} id='pro-categoryId-id' className='form-control' onChange={onChange} />
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
          </div>
        </div>

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
