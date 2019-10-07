import React, {useRef} from 'react'
import InputMask from 'react-input-mask'

import Field from '../field/field'

export default (props) => {
  const {field, icon} = props
  const componentprops = _.pick(props, ['className', 'id', 'defaultValue', 'name', 'disabled', 'readOnly'])

  const ref = useRef(null)

  const onChange = () => {
    if (typeof props.onChange !== 'function') return
    const {value, name} = ref.current
    const val = value.replace(/ \(/g, '').replace(/\) /g, '').replace(/\-/g, '').replace('+84', '0').replace('\_', '').replace(' ', '').trim()
    props.onChange({ ref, value: val, name: props.name})
  }

  return (
    <Field field={field}>
      {
        icon ? <div className='input-group'>
          <div className='input-group-addon'>
            <i className={icon} />
          </div>
          <InputMask
            ref={ref}
            onChange={onChange}
            mask='+84 (999) 999-9999'
            {...componentprops}
          />
        </div>
          : <InputMask
            ref={ref}
            onChange={onChange}
            mask='+84 (999) 999-9999'
            {...componentprops}
          />
      }

    </Field>
  )
}
