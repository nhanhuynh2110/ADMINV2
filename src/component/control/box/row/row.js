/* global _ */
import React from 'react'

export default (props) => {
  const children = props.children
  return <div className='row'>
    {children}
  </div>
}
