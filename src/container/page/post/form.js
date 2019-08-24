/* global _ */

import React from 'react'
import async from 'async'

import Model from './model'
import Field from '../../../component/form/field'
import _ from 'lodash'
import { POSTLINK as LINK } from '../../../helper/link'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import Select from '../../../component/control/select'
import TinyMCE from '../../../helper/tinyMCE'

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.state.TinyMCE = false
  }
  handleSubmit () {
    this.props.handleSubmitSingle((data) => {
      if (!this.props.data) {
        this.props.api.post.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          this.props.history.push(LINK.GRID)
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.post.update(dt, (err, resp) => {
          if (err) alert('update fail')
          this.props.history.push(LINK.GRID)
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  componentDidMount () {
  }

  render () {
    let { categoryPosts, onInputChange } = this.props
    let { title, introTitle, isActive, description, categoryPostId } = this.props.model
    return (
      <FormLayoutDefault
        title='Create Post'
        linkCancleBtn={LINK.GRID}
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
      >
        <form role='form'>
          <div className='box-body'>
            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={onInputChange} defaultValue={title.value} />
            </Field>
            
            <Field field={introTitle}>
              <input type='text' className='form-control' placeholder={introTitle.placeholder} onChange={onInputChange} defaultValue={introTitle.value} />
            </Field>

            <Field field={categoryPostId}>
              <Select isSelected={categoryPostId.value} name='categoryPostId' options={categoryPosts} classSelect='select2' onChange={(e) => onInputChange(null, {name: 'categoryPostId', value: e.target.value})} />
            </Field>

            <Field field={description}>
              <div id='editor'>
                <textarea id='#description' className='editor' />
              </div>
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
      data: null,
      categoryPosts: []
    }
  }

  componentDidMount () {
    let {match} = this.props
    if (!match) return
    let {params} = match

    const data = (cb) => {
      this.props.api.post.get({id: params.id}, (err, data) => {
        if (err) return cb(err)
        return cb(null, data)
      })
    }

    const categoryPosts = (cb) => {
      this.props.api.categoryPost.getAll({}, (err, data) => {
        if (err) return cb(err)
        let options = data.map((el) => {
          return {text: el.title, value: el._id}
        })
        return cb(null, options)
      })
    }

    if (!params.id || params.id === 'add') {
      categoryPosts((err, data) => {
        this.setState({ categoryPosts: data })
      })
    }

    async.parallel({data, categoryPosts}, (err, resp) => {
      if (err) return
      this.setState({ data: resp.data, categoryPosts: resp.categoryPosts })
    })
  }
  render () {
    return <FormBox data={this.state.data} categoryPosts={this.state.categoryPosts} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
