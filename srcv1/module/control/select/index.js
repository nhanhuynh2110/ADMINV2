import React, {useEffect, useRef} from 'react'

export default (props) => {
  const { options, onChange, defaultValue, selectedValue, errorMessage, ...other } = props

  const ref = useRef(null)

  const onHandleChange = () => {
    if (typeof props.onChange !== 'function') return false
    onChange({ ref, value: ref.current.value, name: ref.current.name })
  }

  useEffect(() => {
    if (selectedValue) {
      ref.current.value = selectedValue
    } else {
      ref.current.value = ''
    }
  }, [selectedValue])

  

  return <>
    <select
      ref={ref}
      {...other}
      defaultValue={selectedValue}
      onChange={onHandleChange}>
      <option value=''>...choose...</option>
      { options.map(el => <option key={el.key} value={el.value}>{el.text}</option>) }
    </select>
    {errorMessage && <span className='err-msg'>{errorMessage}</span>}
  </>
}
