import React from 'react'

export default (props) => {
  const onChange = (e) => {
    if (typeof props.onChange !== 'function') return
    props.onChange(e)
  }
  return <input multiple ref={props.setRef} type='file' onChange={onChange} className='hidden' />
}
