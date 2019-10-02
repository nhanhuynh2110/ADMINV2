import React, {useRef} from 'react'
import Field from '../field/field'

export default (props) => {
  const {field} = props
  const componentprops = _.pick(props, ['className', 'id', 'placeholder', 'defaultValue', 'name', 'disabled', 'readOnly'])

  const ref = useRef(null)

  let timeout = null

  const onChange = () => {
    props.onChange({ ref, value: ref.current.value, name: ref.current.name })
  }

  const onChangeDelay = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => onChange(), 500)
  }

  return (
    <React.Fragment>
      <Field field={field}>
        <input
          type='text'
          ref={ref}
          onChange={onChangeDelay}
          {...componentprops}
        />
      </Field>
    </React.Fragment>
  )
}
