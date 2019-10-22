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
import SidebarImage from './sidebarImages'

const domain = conf.server.domain

const LINK = STORELINK.PRODUCTLINK

const fileManagerTarget = {
  mainImage: 'mainImage',
  galleryImages: 'galleryImages',
  sidebarImage: 'sidebarImage'
}

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

  const [currentFileManager, setCurrentFileManager] = React.useState({
    name: null,
    multiple: false,
    options: null
  })

  const [isImgsSideBar, setImgsSideBar] = React.useState(false)
  const [groupImage, setGroupImage] = React.useState(null)

  const showFileManager = (target, multiple = false, options = null) => {
    setCurrentFileManager({ name: target, multiple, options })
    document.getElementById('click-file-manager').click()
  }

  const fileManagerChange = (files) => {
    const targetName = currentFileManager.name
    const fileData = currentFileManager.multiple ? files.paths : files.path
    if (targetName === fileManagerTarget.mainImage) onChange({ name: image.name, value: fileData })
    else if (targetName === fileManagerTarget.galleryImages) onChangeGallery(fileData)
    else if (targetName === fileManagerTarget.sidebarImage) onChangePositionImage(fileData)
  }

  const onChangePositionImage = (path) => {
    const position = currentFileManager.options.position
    const sizeValue = _.clone(size.value)
    const selectedSizeValue = _.clone(selectCurrent.selectSize)
    const selectColorValue = _.clone(selectCurrent.selectColor)

    selectColorValue.images.map(el => {
      if (el.mainImage === groupImage.mainImage) {
        el[position] = path
        return el
      } else {
        return el
      }
    })

    selectedSizeValue.colors.map(el => {
      if (el.color === selectColorValue.color) {
        el = selectColorValue
        return el
      } else {
        return el
      }
    })

    sizeValue.map(el => {
      if (el.name === selectedSizeValue.name) {
        el = selectedSizeValue
        return el
      } else {
        return el
      }
    })

    setSelectCurrent({
      selectSize: selectedSizeValue,
      selectColor: selectColorValue,
    })

    model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
  }

  const onChangeGallery = (paths) => {
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

    model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
  }

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

  return <React.Fragment>
    <Form
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
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-minus'></i></button>
              </div>
            </div>
            <div className='box-body'>
              <div className='row'>
                <div className='col-md-3'>
                  <img className='w-100 camera-image' src={linkImg} />
                  <div className='camera-image-upload-image' onClick={() => showFileManager(fileManagerTarget.mainImage)}>
                    <i className='fa fa-camera' />
                  </div>
                </div>
                <div className='col-md-7'>
                  <Field.Input field={title} defaultValue={title.value} name={title.name} id='pro-title-id' placeholder={title.placeholder} className='form-control' onChange={onChange} />
                  
                  <div className='row'>
                    <div className='col-md-6'>
                      <Field.Select field={categoryId} name={categoryId.name} selectedValue={categoryId.value} options={categories} id='pro-categoryId-id' className='form-control' onChange={onChange} />
                    </div>
                    <div className='col-md-6'>
                      <Field.Input field={code} defaultValue={code.value} name={code.name} id='pro-code-id' placeholder={code.placeholder} className='form-control' onChange={onChange} />
                    </div>
                  </div>
                  

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
                        {size.value && selectCurrent.selectSize && size.value.map((el, k) => {
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
              
                <div className='col-md-2'>
                  <div className='row'>
                    <div className='col-md-12'>
                      <Field.CheckBox field={isActive} id='pro-active-id' defaultChecked={activeChecked} value={isActive.value} name={isActive.name} text={isActive.text} onChange={onChange} />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <Field.CheckBox field={isNewProduct} id='pro-isNewProduct-id' defaultChecked={newProductChecked} value={isNewProduct.value} name={isNewProduct.name} text={isNewProduct.text} onChange={onChange} />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <Field.CheckBox field={isHot} id='pro-isHot-id' defaultChecked={hotChecked} value={isHot.value} name={isHot.name} text={isHot.text} onChange={onChange} />
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                    <Field.CheckBox field={inStock} id='pro-isHot-id' defaultChecked={inStockChecked} value={inStock.value} name={inStock.name} text={inStock.text} onChange={onChange} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col-md-12'>
          <Field.FileGalleries id='category-modal-upload-gallery' name={gallery.name} field={gallery} value={gallery.value} title='Upload Image' api={api} onChange={onChange} />
        </div>
      </div> */}

      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-primary collapsed-box'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                {selectCurrent.selectColor && <button
                  onClick={() => showFileManager(fileManagerTarget.galleryImages, true)}
                  type='button'
                  className='btn btn-success'>
                    Gallery Image
                </button>}
              </h3>
              
              <div className='box-tools pull-right'>
                
                <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-plus'></i></button>
              </div>
            </div>
            <div className='box-body'>
              <div className='row'>
                {selectCurrent.selectColor && selectCurrent.selectColor.images && selectCurrent.selectColor.images.length > 0 && selectCurrent.selectColor.images.map((el, k) => {
                  return (
                    <div onClick={() => {
                      setGroupImage(el)
                      setImgsSideBar(true)
                    }} key={k} className='col-xs-6 col-xm-3 col-md-3 col-lg-2 size-image-item' style={{ backgroundImage: `url('${domain}/${el.mainImage}')` }} />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-primary collapsed-box'>
            <div className='box-header with-border'>
              <h3 className='box-title'>Category & Meta</h3>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-plus'></i></button>
              </div>
            </div>
            <div className='box-body'>
              <div className='row'>
                <div className='col-md-6'>
                  <Field.Input field={altImage} defaultValue={altImage.value} name={altImage.name} id='pro-altImage-id' placeholder={altImage.placeholder} className='form-control' onChange={onChange} />
                  <Field.Input field={metaTitle} defaultValue={metaTitle.value} name={metaTitle.name} id='pro-metaTitle-id' placeholder={metaTitle.placeholder} className='form-control' onChange={onChange} />
                  
                </div>
                <div className='col-md-6'>
                  
                  <Field.Area field={metaDescription} rows='8' name={metaDescription.name} defaultValue={metaDescription.value} id='pro-description-id' className='form-control' onChange={onChange} />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-primary collapsed-box'>
            <div className='box-header with-border'>
              <h3 className='box-title'>Content</h3>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-plus'></i></button>
              </div>
            </div>
            <div className='box-body'>
              <div className='row'>
                <div className='col-md-12'>
                  <Field.Area field={description} rows='6' name={description.name} defaultValue={description.value} id='pro-description-id' className='form-control' onChange={onChange} />
                  <Field.Tiny field={content} id='product-content' name={content.name} defaultValue={content.value} onChange={onChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isImgsSideBar && groupImage && <SidebarImage
        groupImage={groupImage}
        api={props.api}
        closeSideBar={() => {
          setImgsSideBar(false)
          setGroupImage(null)
        }}
        showFileManager={(options) => {
          showFileManager(fileManagerTarget.sidebarImage, false, options)
        }} />}
      <Field.FileManager
        api={props.api}
        multiple={currentFileManager.multiple}
        onChange={fileManagerChange}
        triggerId={'position-image'}
        trigger={<button type='button'
          id='click-file-manager'
          data-name={currentFileManager.name}
          data-target={`#position-image`}
          data-toggle='modal'
          className='btn btn-success pull-right hidden'>Gallery Image &nbsp; <i className='fa fa-plus' /></button>}
      />
    </Form>
  </React.Fragment>
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
