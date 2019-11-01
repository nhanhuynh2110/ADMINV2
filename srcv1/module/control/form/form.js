import React from 'react'

export default (props) => {
  const onSubmit = event => {
    event.preventDefault()
    if (typeof props.onSubmit !== 'function') return
    props.onSubmit(event)
  }

  return <form onSubmit={onSubmit} role='form'>
    {props.children}
  </form>
}
