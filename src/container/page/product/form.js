/* global _ */

import React, {useEffect, useState, forwardRef} from 'react'
import async from 'async'

import { Product } from 'form-layout'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import { Button } from 'lib-module/formControl/control'
import STORELINK from '../../../helper/link'
import { withContainer } from '../../../context'
import modelForm from './model'
import conf from '../../../../config'
import ModalSize from './sizeModal'
import ModalColor from './colorModal'
import SidebarImage from './sidebarImages'
import Box, {Row} from '../../../component/control/box'

const domain = conf.server.domain

const LINK = STORELINK.PRODUCTLINK

const fileManagerTarget = {
  mainImage: 'mainImage',
  gallery: 'gallery',
  galleryImages: 'galleryImages',
  sidebarImage: 'sidebarImage'
}

const FormHandle = (props) => {
  const {isAdd, data, categories, api} = props
  const [model] = useModel(modelForm, isAdd ? null : data)

  const {image, gallery, title, code, price, priceSale,
    categoryId, description, content, altImage, metaTitle,
    metaDescription, isActive, isNewProduct, isHot, inStock, size, info, info1, info2} = model

  const [selectCurrent, setSelectCurrent] = React.useState({
    selectSize: null,
    selectColor: null
  })

  const [isEditSize, setEditSize] = React.useState(false)

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
    else if (targetName === fileManagerTarget.gallery) {
      let galeries = gallery.value ? gallery.value : []
      onChange({ name: gallery.name, value: [...galeries, ...fileData] })
    } else if (targetName === fileManagerTarget.galleryImages) onChangeGallery(fileData)
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
      selectColor: selectColorValue
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

  const openModalSize = () => {
    document.getElementById('btn-size-active').click()
  }

  const createEditSize = ({name, value}) => {
    let sizeValue = _.clone(size.value) || []

    if (isEditSize) {
      sizeValue.map(el => {
        if (el.name === selectCurrent.selectSize.name) el.name = value
        return el
      })
    } else {
      sizeValue.push({ name: value, colors: [] })
    }

    if (!selectCurrent.selectSize) {
      setSelectCurrent({ selectSize: sizeValue[0], selectColor: sizeValue[0].colors && sizeValue[0].colors.length > 0 ? sizeValue[0].colors[0] : null })
    }

    model.validate(name, sizeValue).then(() => model.setValue(name, sizeValue))
  }

  const deleteSize = (sizeName) => {
    let sizeValue = _.clone(size.value)
    sizeValue = sizeValue.filter(el => el.name !== sizeName)
    if (sizeName === selectCurrent.selectSize.name) {
      if (sizeValue.length > 0) {
        const newSelectedSize = sizeValue[0]
        const newSelectColor = newSelectedSize.colors && newSelectedSize.colors.length > 0 ? newSelectedSize.colors[0] : null
        setSelectCurrent({selectSize: newSelectedSize, selectColor: newSelectColor})
      } else setSelectCurrent({selectSize: null, selectColor: null})
    }
    model.validate(size.name, sizeValue).then(() => model.setValue(size.name, sizeValue))
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

  const deleteImage = (e) => {
    let newValue = []
    var img = e.target.getAttribute('data-img')
    if (!gallery.value.includes(img)) return
    newValue = gallery.value.filter(el => el !== img)
    onChange({ name: gallery.name, value: newValue })
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
      <Row.MD12 useRow>
        <Box className='box-primary' title='Info' collapsed='open' >
          <Row.MD3>
            <img className='w-100 camera-image' src={linkImg} />
            <div className='camera-image-upload-image' onClick={() => showFileManager(fileManagerTarget.mainImage)}>
              <i className='fa fa-camera' />
            </div>
          </Row.MD3>
          <Row.MD7>
            <Field.Input field={title} defaultValue={title.value} name={title.name} id='pro-title-id' placeholder={title.placeholder} className='form-control' onChange={onChange} />
            <Row>
              <Row.MD6>
                <Field.Select field={categoryId} name={categoryId.name} selectedValue={categoryId.value} options={categories} id='pro-categoryId-id' className='form-control' onChange={onChange} />
              </Row.MD6>
              <Row.MD6>
                <Field.Input field={code} defaultValue={code.value} name={code.name} id='pro-code-id' placeholder={code.placeholder} className='form-control' onChange={onChange} />
              </Row.MD6>
            </Row>
            <Row>
              <Row.MD6>
                <Field.Input field={price} defaultValue={price.value} name={price.name} id='pro-price-id' placeholder={price.placeholder} className='form-control' onChange={onChange} />
              </Row.MD6>
              <Row.MD6>
                <Field.Input field={priceSale} defaultValue={priceSale.value} name={priceSale.name} id='pro-priceSale-id' placeholder={priceSale.placeholder} className='form-control' onChange={onChange} />
              </Row.MD6>
              <Row.MD4>
                <Field.Input field={info} defaultValue={info.value} name={info.name} id='pro-info-id' placeholder={info.placeholder} className='form-control' onChange={onChange} />
              </Row.MD4>
              <Row.MD4>
                <Field.Input field={info1} defaultValue={info1.value} name={info1.name} id='pro-info1-id' placeholder={info1.placeholder} className='form-control' onChange={onChange} />  
              </Row.MD4>
              <Row.MD4>
                <Field.Input field={info2} defaultValue={info2.value} name={info2.name} id='pro-info2-id' placeholder={info2.placeholder} className='form-control' onChange={onChange} />
              </Row.MD4>
              <Row.MD12>
                <div className='groups-size'>
                  <div className='form-group'>
                    <label>Size</label>
                    {size.value && selectCurrent.selectSize && size.value.map((el, k) => {
                      return <React.Fragment key={el.name + '-' + k} >
                        <span className='position-relative display-inline-block size-item'>
                          <Button onClick={() => onSelectSize(el.name)} text={el.name} type='default' className={el.name === selectCurrent.selectSize.name ? 'margin btn-size-active' : 'margin'} />
                          <span className='groups-button-size'>
                            <button type='button' className='size-edit btn btn-default btn-xs' onClick={() => { setEditSize(true); openModalSize() }}><i className='fa fa-edit' /> Edit</button> &nbsp;
                            <button type='button' className='size-edit btn btn-default btn-xs' onClick={() => deleteSize(el.name)}><i className='fa fa-remove' /> Remove</button>
                          </span>
                        </span>
                      </React.Fragment>
                    })}
                    <button type='button' onClick={() => { setEditSize(false); openModalSize() }} data-toggle='modal' className='btn bg-orange margin'><i className='fa fa-plus' /></button>
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
              </Row.MD12>
            </Row>
          </Row.MD7>
          <Row.MD2>
            <Row.MD12 useRow>
              <Field.CheckBox field={isActive} id='pro-active-id' defaultChecked={activeChecked} value={isActive.value} name={isActive.name} text={isActive.text} onChange={onChange} />
            </Row.MD12>
            <Row.MD12 useRow>
              <Field.CheckBox field={isNewProduct} id='pro-isNewProduct-id' defaultChecked={newProductChecked} value={isNewProduct.value} name={isNewProduct.name} text={isNewProduct.text} onChange={onChange} />
            </Row.MD12>
            <Row.MD12 useRow>
              <Field.CheckBox field={isHot} id='pro-isHot-id' defaultChecked={hotChecked} value={isHot.value} name={isHot.name} text={isHot.text} onChange={onChange} />
            </Row.MD12>
            <Row.MD12 useRow>
              <Field.CheckBox field={inStock} id='pro-isHot-id' defaultChecked={inStockChecked} value={inStock.value} name={inStock.name} text={inStock.text} onChange={onChange} />
            </Row.MD12>
          </Row.MD2>
        </Box>
      </Row.MD12>

      <Row.MD12 useRow>
        <Box.Wrapper className='box-primary' collapsed='close'>
          <Box.Header collapsed='close'>
            <Button icon='fa-camera' iconPosition='before' onClick={() => showFileManager(fileManagerTarget.gallery, true)} type='success' text='Gallery' />
          </Box.Header>
          <Box.Body>
            <div className='timeline-body'>
              {gallery.value && gallery.value.map(el => {
                return <a key={el}><img src={`${domain}/${el}`} alt='...' className='margin' /><i data-img={el} onClick={deleteImage} className='fa fa-remove' /></a>
              })}
            </div>
          </Box.Body>
        </Box.Wrapper>
      </Row.MD12>

      <Row.MD12 useRow>
        <Box.Wrapper className='box-primary' collapsed='close'>
          <Box.Header collapsed='close'>
            {selectCurrent.selectColor
              ? <Button icon='fa-camera' iconPosition='before' onClick={() => showFileManager(fileManagerTarget.galleryImages, true)} type='success' text='Gallery Image' />
              : <h3 className='box-title'>Gallery Image</h3>}
          </Box.Header>
          <Box.Body>
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
          </Box.Body>
        </Box.Wrapper>
      </Row.MD12>

      <Row.MD12 useRow>
        <Box className='box-primary' title='Meta' collapsed='close' >
          <Row.MD6>
            <Field.Input field={altImage} defaultValue={altImage.value} name={altImage.name} id='pro-altImage-id' placeholder={altImage.placeholder} className='form-control' onChange={onChange} />
            <Field.Input field={metaTitle} defaultValue={metaTitle.value} name={metaTitle.name} id='pro-metaTitle-id' placeholder={metaTitle.placeholder} className='form-control' onChange={onChange} />
          </Row.MD6>
          <Row.MD6>
            <Field.Area field={metaDescription} rows='5' name={metaDescription.name} defaultValue={metaDescription.value} id='pro-description-id' className='form-control' onChange={onChange} />
          </Row.MD6>
        </Box>
      </Row.MD12>

      <Row.MD12 useRow>
        <Box className='box-primary' title='Content' collapsed='close'>
          <Row.MD12>
            <Field.Area field={description} rows='6' name={description.name} defaultValue={description.value} id='pro-description-id' className='form-control' onChange={onChange} />
            <Field.Tiny field={content} id='product-content' name={content.name} defaultValue={content.value} onChange={onChange} />
          </Row.MD12>
        </Box>
      </Row.MD12>

      <button type='button' id='btn-size-active' data-target='#modal-size-form' data-toggle='modal' className='hidden' />
      <ModalSize defaultValue={isEditSize && selectCurrent.selectSize ? selectCurrent.selectSize.name : ''} name={size.name} isEdit={isEditSize} onSubmit={createEditSize} selectSize={selectCurrent.selectSize} />

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
