import React from 'react'
import Model from './model'
import Field from '../../../component/form/field'
import { withFormBehaviors } from '../../../component/form/form'
import FormLayoutDefault from '../../../component/form/layout/default'
import { withContainer } from '../../../context'
import _ from 'lodash'
class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit () {
    this.props.handleSubmitSingle((data) => {
      if (!this.props.data) {
        this.props.api.category.insert(data, (err, resp) => {
          if (err) return alert('save fail')
          alert('save success')
        })
      } else {
        let dt = data
        dt.id = this.props.data._id
        this.props.api.category.update(dt, (err, resp) => {
          if (err) alert('update fail')
          alert('update success')
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  render () {
    let { title, isActive, isHome } = this.props.model
    return (
      <FormLayoutDefault
        title='Create Category'
        linkCancleBtn='/category'
        isFormValid={this.props.isFormValid}
        hasChanged={this.props.hasChanged}
        handleSubmit={this.handleSubmit}
      >
        <form role='form'>
          <div className='box-body'>
            <Field field={title}>
              <input type='text' className='form-control' placeholder={title.placeholder} onChange={this.props.onInputChange} defaultValue={title.value} />
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
    let {match, isEdit} = this.props
    if (!match) return
    let {params} = match
    if (!isEdit) return false
    this.props.api.category.get({id: params.id}, (err, data) => {
      if (err) return
      this.setState({ data })
    })
  }
  render () {
    return <FormBox data={this.state.data} api={this.props.api} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api
}))
