import React from 'react'

export default (props) => {
  const {children, field, htmlForId} = props
  const { label, error, className } = field
  return (
    <div className={className || 'form-group'} >
      {label && <label htmlFor={htmlForId}>{label}</label>}
      {children}

      {error && <span className='err-msg'>{error}</span>}
    </div>
  )
}
