import React from 'react'

export default ({children, title}) => {
  return (
    <div className='login-box'>
      <div className='login-logo'>
        <a><b>Admin</b>LTE</a>
      </div>
      <div className='login-box-body'>
          {title && <p className='login-box-msg'>{title}</p>}
            {children}
            <div className='row'>
              <div className='col-xs-12'>
                <input
                  type='submit'
                  defaultValue='Change'
                  className='btn btn-primary btn-block btn-flat' />
              </div>
            </div>
        </div>
    </div>
  )
}