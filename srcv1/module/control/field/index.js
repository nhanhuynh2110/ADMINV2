import React from 'react'

export default ({label, children, htmlForId, className = 'form-group'}) => {
  return <div className={className}>
    {label && <label htmlFor={htmlForId}>{label} &nbsp;</label>}
    {children}
  </div>
}
