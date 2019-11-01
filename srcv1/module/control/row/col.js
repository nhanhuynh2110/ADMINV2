import React from 'react'
import Row from './row'

export default ({children ,className='', useRow = false}) => {
  return useRow
    ? <Row><div className={className ? className : ''}>{children}</div></Row>
    : <div className={className ? className : ''}>{children}</div>
}
