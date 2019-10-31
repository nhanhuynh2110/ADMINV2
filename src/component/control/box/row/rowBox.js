/* global _ */
import React from 'react'
import Box from '../box'

export default (props) => {
  const propsBox = _.pick(props, ['title', 'className', 'collapsed'])
  const children = props.children
  return <Box {...propsBox}>
    <div className='row'>
      {children}
    </div>
  </Box>
}
