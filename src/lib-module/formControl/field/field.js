import React from 'react'

export default (props) => {
  const {children, field, htmlForId} = props
  const { label } = field
  return (
    <div className='form-group'>
      {label && <label htmlFor={htmlForId}>{label}</label>}
      {children}
    </div>
  )
}
