import React, {useRef, useEffect} from 'react'
import Field from '../field/field'

export default (props) => {
  const {field, afterDom, isCheckSubmit} = props
  const componentprops = _.pick(props, ['className', 'id', 'placeholder', 'defaultValue', 'name', 'disabled', 'readOnly', 'type', 'autoComplete'])

  const ref = useRef(null)

  let timeout = null

  const onChange = () => {
    props.onChange({ ref, value: ref.current.value, name: ref.current.name })
  }

  const hanldCheck = () => {
    if (typeof props.hanldCheck !== 'function' || !isCheckSubmit) return
    props.hanldCheck()
  }

  const onClose = () => {
    if (typeof props.onClose !== 'function') return
    props.onClose()
  }

  const onChangeDelay = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => onChange(), 500)
  }

  const disableCheck = isCheckSubmit ? 'input-group-addon' : 'input-group-addon input-check-disabled'

  useEffect (() => {
    // init()
    // if (model)
    ref.current.focus()
  }, [])

  return (
    <React.Fragment>
      <Field field={field}>
        <div className='input-group'>
          <span className='input-group-addon'><i className='fa fa-folder'></i></span>
          <input
            ref={ref}
            onChange={onChangeDelay}
            {...componentprops}
          />
          <span className={disableCheck} onClick={hanldCheck} ><i className='fa fa-check'></i></span>
          <span className='input-group-addon' onClick={onClose}><i className='fa fa-remove'></i></span>
        </div>
        {afterDom}
      </Field>
    </React.Fragment>
  )
}
