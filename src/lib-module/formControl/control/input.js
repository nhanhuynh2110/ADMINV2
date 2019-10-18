import React, {useEffect, useRef} from 'react'
import Field from '../field/field'

export default (props) => {
  const {field, afterDom} = props
  const componentprops = _.pick(props, ['className', 'id', 'placeholder', 'defaultValue', 'name', 'disabled', 'readOnly', 'type', 'autoComplete'])

  const ref = useRef(null)

  let timeout = null

  const onChange = () => {
    if (typeof props.onChange !== 'function') return
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
    <React.Fragment>
      <Field field={field}>
        <input
          ref={ref}
          onChange={onChangeDelay}
          {...componentprops}
        />
        {afterDom}
      </Field>
    </React.Fragment>
  )
}
