/* global _, $ */

import React from 'react'
import Field from '../field/field'

export default (props) => {
  const {field} = props
  const componentprops = _.pick(props, ['className', 'id', 'placeholder', 'defaultValue', 'name', 'disabled', 'readOnly', 'type'])
  const ref = React.useRef(null)

  let timeout = null

  const onChange = (colorValue) => {
    if (typeof props.onChange !== 'function') return
    props.onChange({ ref, value: colorValue, name: props.name })
  }

  const onChangeDelay = (colorValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => onChange(colorValue), 500)
  }

  React.useEffect(() => {
    $(`#color-${props.id}`).colorpicker().on('changeColor', (e) => {
      const colorValue = e.color.toHex()
      onChangeDelay(colorValue)
    })
  }, [props.defaultValue])

  return (
    <Field field={field}>
      <div id={`color-${props.id}`} className='input-group my-colorpicker2 colorpicker-element'>
        {/* <input
          ref={ref}
          className='form-control'
          {...componentprops}
        /> */}
        <div className='input-group-addon'>
          <i />
        </div>
      </div>
    </Field>
  )
}
