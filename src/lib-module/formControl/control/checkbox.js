import React, {useEffect, useRef, useState} from 'react'
import Field from '../field/field'

const style = {
  input: {
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
  },
  ins: {
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
  }
}

export default (props) => {
  const { field, className, text } = props

  const componentProps = _.pick(props, ['id', 'value', 'disabled', 'readOnly', 'name', 'defaultChecked'])

  const ref = useRef()
  let ckeckboxClass = props.defaultChecked ? 'icheckbox_square-blue ' + className + ' checked' : 'icheckbox_square-blue ' + className

  const onChange = () => {
    if (typeof props.onChange !== 'function') return false
    props.onChange({ ref, value: ref.current.checked, name: ref.current.name, checked: ref.current.checked })
  }

  useEffect(() => {
    ref.current.checked = props.defaultChecked
  }, [props.defaultChecked])

  return (
    <Field field={field}>
      <div className='checkbox icheck'>
        <label className=''>
          <div
            className={ckeckboxClass}
            aria-checked='true' aria-disabled='false'
            style={{position: 'relative'}}>
            <input type='checkbox'
              {...componentProps}
              onChange={onChange}
              ref={ref}
              style={style.input}
            />
            <ins
              className='iCheck-helper'
              style={style.ins}
            />
          </div>
          &nbsp;&nbsp;{text}
        </label>
      </div>
    </Field>

  )
}
