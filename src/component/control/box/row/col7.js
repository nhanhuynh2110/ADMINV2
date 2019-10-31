import React from 'react'
import Row from './row'

export default ({children, useRow = false}) => {
  return useRow
    ? <Row>
      <div className='col-md-7'>
        {children}
      </div>
    </Row>
    : <div className='col-md-7'>
      {children}
    </div>
}
