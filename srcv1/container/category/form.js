import React from 'react'
import useReactRouter from 'use-react-router'
import {Form, Field, Input, Select, Box} from 'control'
import STORELINK from '../storeLink'
import CategoryService from './services'
const LINK = STORELINK.CATEGORY

import loginModel from './model'
import { useModel } from '../../core'

const FormHandle = ({parents, data}) => {
  const model = useModel(loginModel, data)
  const { title, parentId } = model

  const submit = () => {
    console.log('Data', model.data)
    console. log('Error', model.errors)
  }

  const onChange = ({name, value}) => {
    model[name].setValue(value)
  }

  return <Form onSubmit={submit}>
    <Form.Layout title='Create Category' cancle={LINK.grid} formValid>
      <Field label={title.label} >
        <Input
          errorMessage={!title.isValid ? title.error.message : null}
          className='form-control' name={title.name} id={title.name}
          defaultValue={title.value} onChange={onChange} />
      </Field>

      <Field label={parentId.label} >
        <Select
          errorMessage={!parentId.isValid ? parentId.error.message : null}
          name={parentId.name} selectedValue={parentId.value}
          options={parents} id={parentId.name} className='form-control' onChange={onChange} />
      </Field>
    
    
    </Form.Layout>
  </Form>
}

export default ({isAdd}) => {
  const {match} = useReactRouter()
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    CategoryService.loadDataForm(!isAdd, match.params.id)
      .then(resp => setData({parents: resp.parents, detail: !isAdd ? resp.detail : null }))
      .catch(() => setData({error: 'Data not found'}))
  }, [])

  if (!data) return null
  if (data.error) return <h1>{data.error}</h1>

  return <FormHandle parents={data.parents} data={data.detail} />
}