import React from 'react'

export default ({children, className, collapsed}) => {
  let classBox = className ? `box ${className}` : 'box'
  if (collapsed === 'close') classBox += ' collapsed-box'
  return <div className={classBox}>
    {children}
  </div>
}
