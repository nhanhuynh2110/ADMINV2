/* global _ */

import React, {useEffect, useState, forwardRef} from 'react'
import { Basic } from 'form-layout'
import async from 'async'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import STORELINK from '../../../helper/link'
import { withContainer } from '../../../context'
import modelForm from './model'
import conf from '../../../../config'
import useReactRouter from 'use-react-router'

const domain = conf.server.domain

const LINK = STORELINK.CATEGORYLINK

const FormHandle = (props) => {
  const {isAdd, data, parents, api} = props
  const { history } = useReactRouter()
  const [model] = useModel(modelForm, data)

  const {img, title, parentId, description, isActive, isHome, altImage, metaTitle, metaDescription} = model

  const onChange = ({name, value}) => {
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    const formData = model.data
    if (!isAdd) {
      let dt = formData
      dt.id = props.data._id
      dt.parentId = dt.parentId ? dt.parentId : null
      api.category.update(dt, (err, resp) => {
        if (err) return alert('update fail')
        history.push(LINK.GRID)
      })
    } else {
      api.category.insert(formData, (err, resp) => {
        if (err) return alert('save fail')
        history.push(LINK.GRID)
      })
    }
  }

  let activeChecked = isActive.value
  let homeChecked = isHome.value
  var linkImg = (img && img.value) ? domain + '/' + img.value : 'http://placehold.it/250x150'

  return <Form
    Layout={Basic}
    title='Category Form'
    cancle={LINK.GRID}
    onSubmit={onSubmit}
    formValid={model.valid}
  >
    <div className='row'>
      <div className='col-md-4'>
        <Field.FileImage id='category-modal-upload' name={img.name} field={img} value={linkImg} title='Upload Image' api={api} onChange={onChange} />
      </div>
    </div>
    {/* <div className='row'>
      <div className='col-md-12'>
        <Field.FileGalleries id='category-modal-upload-gallery' name={img.name} field={img} value={linkImg} title='Upload Image' api={api} onChange={onChange} />
      </div>
    </div> */}
    <div className='row'>
      <div className='col-md-6'>
        <Field.Input field={title} defaultValue={title.value} name={title.name} id='category-title-id' placeholder='please enter' className='form-control' onChange={onChange} />
        <Field.Select field={parentId} name={parentId.name} selectedValue={parentId.value} options={parents} id='category-parents-id' className='form-control' onChange={onChange} />
        <Field.Area field={description} rows='6' name={description.name} defaultValue={description.value} id='category-description-id' className='form-control' onChange={onChange} />
      </div>
      <div className='col-md-6'>
        <Field.Input field={altImage} defaultValue={altImage.value} name={altImage.name} id='category-altImage-id' placeholder={altImage.placeholder} className='form-control' onChange={onChange} />
        <Field.Input field={metaTitle} defaultValue={metaTitle.value} name={metaTitle.name} id='category-metaTitle-id' placeholder={metaTitle.placeholder} className='form-control' onChange={onChange} />
        <Field.Input field={metaDescription} defaultValue={metaDescription.value} name={metaDescription.name} id='category-metaDescription-id' placeholder={metaDescription.placeholder} className='form-control' onChange={onChange} />
      </div>
    </div>

    <div className='row'>
      <div className='col-md-12'>
        <Field.CheckBox field={isActive} id='category-active-id' defaultChecked={activeChecked} value={isActive.value} name={isActive.name} text='Active' onChange={onChange} />
        <Field.CheckBox field={isHome} id='category-home-id' defaultChecked={homeChecked} value={isHome.value} name={isHome.name} text='Home' onChange={onChange} />
      </div>
    </div>
  </Form>
}

const FormWrapper = forwardRef((props, ref) => {
  const {match, api} = props
  let {params} = match

  let [formData, setFormData] = useState()

  useEffect(() => {
    const parents = (cb) => {
      api.category.getParents({}, (err, resp) => {
        if (err) return cb(err)
        let data = resp.map(el => ({ text: el.title, value: el._id }))
        return cb(null, data)
      })
    }

    const data = (cb) => {
      api.category.get({id: params.id}, (err, resp) => {
        if (err) return cb(err)
        return cb(null, resp)
      })
    }

    if (params.id === 'add') {
      parents((err, prs) => {
        if (err) return
        setFormData({ parents: prs })
      })
    } else {
      async.parallel({ data, parents }, (err, resp) => {
        if (err) return
        const { data, parents } = resp
        _.remove(parents, {
          value: data._id
        })
        setFormData({ parents, data })
      })
    }
  }, [match])

  console.log('formData.parents', formData)

  return formData && <FormHandle isAdd={!formData.data} parents={formData.parents} data={formData.data} api={api} />
})

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
