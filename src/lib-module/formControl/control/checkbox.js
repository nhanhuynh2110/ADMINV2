import React, {useRef, useState} from 'react'
import Field from '../field/field'

export default (props) => {
  const [isCheck, setCheckbox] = useState(false)
  const { field, className, value, text } = props

  const componentProps = _.pick(props, ['id', 'disabled', 'readOnly', 'name'])

  const ref = useRef(null)

  let ckeckboxClass = ''

  if (isCheck) ckeckboxClass = 'icheckbox_square-blue ' + className + ' checked'
  else ckeckboxClass = 'icheckbox_square-blue ' + className

  const onChange = () => {
    setCheckbox(ref.current.checked)
    if (typeof props.onChange !== 'function') return false
    props.onChange({ ref, value: ref.current.value, name: ref.current.name, checked: ref.current.checked })
  }
  return (
    <Field field={field}>
      <div className='checkbox icheck'>
        <label className=''>
          <div
            className={ckeckboxClass}
            aria-checked='true' aria-disabled='false'
            style={{position: 'relative'}}>
            <input type='checkbox'
              defaultChecked={isCheck}
              value={value}
              {...componentProps}
              onChange={onChange}
              ref={ref}
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                display: 'block',
                width: '140%',
                height: '140%',
                margin: '0px',
                padding: '0px',
                background: 'rgb(255, 255, 255)',
                border: '0px',
                opacity: '0' }}
            />
            <ins
              className='iCheck-helper'
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                display: 'block',
                width: '140%',
                height: '140%',
                margin: '0px',
                padding: '0px',
                background: 'rgb(255, 255, 255)',
                border: '0px',
                opacity: '0'
              }}
            />
          </div>
          &nbsp;&nbsp;{text}
        </label>
      </div>
    </Field>

  )
}
