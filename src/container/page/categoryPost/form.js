/* global _ */

import React from 'react'
import Model from './model'
import Field from '../../../component/form/field'
import _ from 'lodash'
import { CATEGORYPOSTLINK as LINK } from '../../../helper/link'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
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
        this.props.api.categoryPost.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          this.props.history.push(LINK.GRID)
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.categoryPost.update(dt, (err, resp) => {
          if (err) alert('update fail')
          this.props.history.push(LINK.GRID)
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  componentDidMount () {
    TinyMCE.init('#editor', 'description', this.props.onInputChange)
    // console.log('TinyMCE.tiny.EditorManager', TinyMCE.tiny.EditorManager)
    // TinyMCE.tiny.EditorManager.execCommand('mceAddControl', true, '#categorypostdescription');
    // console.log(11111, TinyMCE.tiny(), TinyMCE.get('#categorypostdescription'))
    // tinymce.EditorManager.execCommand('mceRemoveControl',true, editor_id);
    // TinyMCE.init('#editor', 'description', this.props.onInputChange)
    // TinyMCE.remove('#categorypostdescription', () => {
    //   TinyMCE.init('#categorypostdescription', 'description', this.props.onInputChange)
    // })
  }

  render () {
    let { title, isActive, isHome, fate, description } = this.props.model
    console.log('this.props.model', this.props.model)
    return (
      <FormLayoutDefault
        title='Create Category Post'
        linkCancleBtn='/category-post'
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
      >
        <form role='form'>
          <div className='box-body'>
            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={this.props.onInputChange} defaultValue={title.value} />
            </Field>
            <Field field={fate}>
              <input type='text' className='form-control' placeholder={fate.placeholder} onChange={this.props.onInputChange} defaultValue={fate.value} />
            </Field>

            <Field field={description}>
              <div id='editor'>
                <textarea id='#description' className='editor' />
              </div>
            </Field>
            <Field field={isActive}>
              <span className='checkbox-react' onClick={() => this.props.onInputChange(null, { name: 'isActive', value: !isActive.value })}>
                {isActive.value && <i className='fa fa-check' />}
              </span>
            </Field>
            <Field field={isHome}>
              <span className='checkbox-react' onClick={() => this.props.onInputChange(null, { name: 'isHome', value: !isHome.value })}>
                {isHome.value && <i className='fa fa-check' />}
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
    if (!params.id || params.id === 'add') return false
    this.props.api.categoryPost.get({id: params.id}, (err, data) => {
      if (err) return
      this.setState({ data })
    })
  }
  render () {
    return <FormBox data={this.state.data} {...this.props} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
