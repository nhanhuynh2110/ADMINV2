import React, {useEffect, useRef} from 'react'

export default (props) => {
  const {onChange, errorMessage, ...componentprops} = props

  const ref = useRef(null)

  let timeout = null

  const handleChange = (e) => {
    if (typeof props.onChange !== 'function') return
    onChange({ e, ref, value: ref.current.value, name: ref.current.name })
  }

  const onChangeDelay = (e) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => handleChange(e), 500)
  }

  useEffect(() => {
    ref.current.value = props.defaultValue
  }, [props.defaultValue])

  return (
    <React.Fragment>
      <input
        type='text'
        ref={ref}
        onChange={onChangeDelay}
        {...componentprops}
      />
      {errorMessage && <span className='err-msg'>{errorMessage}</span>}
    </React.Fragment>
  )
}
