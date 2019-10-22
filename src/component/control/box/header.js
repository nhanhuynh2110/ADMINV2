import React from 'react'

export default ({children, title, collapsed}) => {
  return (
    <div className='box-header with-border'>
      {title && <h3 className='box-title'>{title}</h3>}
      {children}

      {collapsed && <div className='box-tools pull-right'>
        <button type='button' className='btn btn-box-tool' data-widget='collapse'>
          {collapsed === 'close' ? <i className='fa fa-plus' /> : <i className='fa fa-minus' />}
        </button>
      </div>}
    </div>
  )
}
