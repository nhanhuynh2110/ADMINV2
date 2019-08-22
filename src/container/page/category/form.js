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
          if (err) alert('save fail')
          alert('save success')
        })
      } else {
        let dt = data
        dt.code = this.props.data.code
        dt.is_active = dt.active
        delete dt.active
        this.props.api.category.update(dt, (err, resp) => {
          if (err) alert('update fail')
          alert('update success')
        })
      }
      this.props.handleSubmitFinish()
    })
  }

  render () {
    let { title, active } = this.props.model
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
            <Field field={active}>
              <span className='checkbox-react' onClick={() => this.props.onInputChange(null, { name: 'active', value: active.value !== 1 ? 1 : 0 })}>
                {active.value === 1 && <i className='fa fa-check' />}
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
    if (!params.code || params.code === 'add') return false
    this.props.api.category.get({code: params.code}, (err, resp) => {
      if (err) return
      let data = resp
      data.active = data.is_active
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
