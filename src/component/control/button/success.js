import React from 'react'

export default (props) => {
  const {text = 'button'} = props
  const onClick = () => {
    if (typeof props.onClick !== 'function') return
    props.onClick()
  }

  return <button
    onClick={onClick}
    type='button'
    className='btn btn-success'>{text}</button>
}
