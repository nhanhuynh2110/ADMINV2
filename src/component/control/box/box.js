import React from 'react'

export default (props) => {
  const {children, className, title, collapsed} = props
  let classBox = className ? `box ${className}` : 'box'
  if (collapsed === 'close') classBox += ' collapsed-box'
  return (
    <div className={classBox}>

      <div className='box-header with-border'>
        {title && <h3 className='box-title'>{title}</h3>}
        {collapsed && <div className='box-tools pull-right'>
          <button type='button' className='btn btn-box-tool' data-widget='collapse'>
            {collapsed === 'close' ? <i className='fa fa-plus' /> : <i className='fa fa-minus' />}
          </button>
        </div>}
      </div>

      <div className='box-body'>
        <div className='row'>
          {children}
        </div>
      </div>

    </div>
  )
}
