import React, {forwardRef, useState, useEffect} from 'react'
import useReactRouter from 'use-react-router'
import async from 'async'
import { withContainer } from '../../../context'
import Form, { Field, Model as useModel } from 'lib-module/formControl'
import modelForm from './model'
import Box, {Row} from '../../../component/control/box'
import STORELINK from '../../../helper/link'
import conf from '../../../../config'

import {Product} from 'form-layout'

const domain = conf.server.domain

const LINK = STORELINK.POSTLINK

const FormHandle = (props) => {
  const {isAdd, data, categoryPosts, api} = props
  const { history } = useReactRouter()
  const [model] = useModel(modelForm, data)
  const {image, title, introTitle, categoryPostId, description, content, isActive, altImage, metaTitle, metaDescription} = model
  
  const onChange = ({name, value}) => {
    console.log('change img', name, value)
    model.validate(name, value).then(() => model.setValue(name, value))
  }

  const onSubmit = () => {
    const formData = model.data
    if (!isAdd) {
      let dt = formData
      dt.id = props.data._id
      api.post.update(dt, (err, resp) => {
        if (err) return alert('update fail')
        history.push(LINK.GRID)
      })
    } else {
      api.post.insert(formData, (err, resp) => {
        if (err) return alert('save fail')
        history.push(LINK.GRID)
      })
    }
  }

  var linkImg = (image && image.value) ? domain + '/' + image.value : 'http://placehold.it/250x150'
  let activeChecked = isActive.value
  return <Form
    Layout={Product}
    title='Post Form'
    cancle={LINK.GRID}
    onSubmit={onSubmit}
    formValid={model.valid}
  >
    <Row.MD12 useRow>
      <Box className='box-primary' title='Info' collapsed='open' >
        <Row.MD3>
          <Field.FileImage id='post-modal-upload' name={image.name} field={image} value={linkImg} title='Upload Image' api={api} onChange={onChange} />
        </Row.MD3>
        <Row.MD7>
          <Field.Input field={title} defaultValue={title.value} name={title.name} id='post-title-id' placeholder={title.placeholder} className='form-control' onChange={onChange} />
          <Row>
            <Row.MD6>
              <Field.Input field={introTitle} defaultValue={introTitle.value} name={introTitle.name} id='post-introTitle-id' placeholder={introTitle.placeholder} className='form-control' onChange={onChange} />
            </Row.MD6>
            <Row.MD6>
              <Field.Select field={categoryPostId} name={categoryPostId.name} selectedValue={categoryPostId.value} options={categoryPosts} id='post-categoryId-id' className='form-control' onChange={onChange} />
            </Row.MD6>
          </Row>
        </Row.MD7>
        <Row.MD2>
          <Row.MD12 useRow>
            <Field.CheckBox field={isActive} id='post-active-id' defaultChecked={activeChecked} value={isActive.value} name={isActive.name} text={isActive.text} onChange={onChange} />
          </Row.MD12>
        </Row.MD2>
      </Box>
    </Row.MD12>

    <Row.MD12 useRow>
      <Box className='box-primary' title='Meta' collapsed='close' >
        <Row.MD6>
          <Field.Input field={altImage} defaultValue={altImage.value} name={altImage.name} id='post-altImage-id' placeholder={altImage.placeholder} className='form-control' onChange={onChange} />
          <Field.Input field={metaTitle} defaultValue={metaTitle.value} name={metaTitle.name} id='post-metaTitle-id' placeholder={metaTitle.placeholder} className='form-control' onChange={onChange} />
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
  </Form>
}

const FormWrapper = forwardRef((props, ref) => {
  const {match, api} = props
  let {params} = match
  let [formData, setFormData] = useState(null)

  useEffect(() => {
    const categoryPosts = (cb) => {
      props.api.categoryPost.getAll({}, (err, data) => {
        if (err) return cb(err)
        let options = data.map((el) => ({key: el._id, text: el.title, value: el._id}))
        return cb(null, options)
      })
    }

    const data = (cb) => {
      props.api.post.get({id: params.id}, (err, dt) => {
        if (err) return cb(err)
        return cb(null, dt)
      })
    }

    if (params.id === 'add') {
      categoryPosts((err, catPs) => {
        if (err) return
        setFormData({ categoryPosts: catPs, data: null, isAdd: true })
      })
    } else {
      async.parallel({ data, categoryPosts }, (err, resp) => {
        if (err) return
        const { data, categoryPosts } = resp
        setFormData({ categoryPosts, data, isAdd: false })
      })
    }
  }, [match])
  return formData && <FormHandle isAdd={!formData.data} categoryPosts={formData.categoryPosts} data={formData.data} api={api} />
})

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))