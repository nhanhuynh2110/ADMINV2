import React, {useRef} from 'react'
import Field from '../field/field'

export default (props) => {
  const { field, options, selectedValue } = props
  const componentProps = _.pick(props, 'className', 'id', 'name', 'readOnly', 'disabled')

  const ref = useRef(null)

  const onChange = () => {
    if (typeof props.onChange !== 'function') return false
    props.onChange({ ref, value: ref.current.value, name: ref.current.name })
  }

  return (
    <Field field={field}>
      <select
        ref={ref}
        {...componentProps}
        defaultValue={selectedValue}
        onChange={onChange}>
        { options.map(el => <option key={el.key} value={el.value}>{el.text}</option>) }
      </select>
    </Field>
  )
}
