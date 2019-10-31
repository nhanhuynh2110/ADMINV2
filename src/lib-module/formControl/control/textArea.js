import React, {useEffect, useRef} from 'react'
import Field from '../field/field'

export default (props) => {
  const { field } = props
  const componentprops = _.pick(props, ['className', 'rows', 'placeholder', 'id', 'defaultValue', 'value', 'name', 'disabled', 'readOnly'])

  const ref = useRef(null)

  let timeout = null

  const onChange = () => {
    if (typeof props.onChange !== 'function') return false
    props.onChange({ ref, value: ref.current.value, name: ref.current.name })
  }

  const onChangeDelay = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => onChange(), 500)
  }

  useEffect(() => {
    ref.current.value = props.defaultValue
  }, [props.defaultValue])

  return (
    <Field field={field}>
      <textarea
        ref={ref}
        onChange={onChangeDelay}
        {...componentprops}
      />
    </Field>
  )
}
