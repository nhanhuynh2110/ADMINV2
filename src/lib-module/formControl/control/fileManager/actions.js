import React from 'react'

export default () => {
  return <React.Fragment>
    <div className='btn-group'>
      <button type='button' className='btn btn-default btn-flat'>Action</button>
      <button type='button' className='btn btn-default btn-flat dropdown-toggle' data-toggle='dropdown'>
        <span className='caret' />
        <span className='sr-only'>Toggle Dropdown</span>
      </button>
      <ul className='dropdown-menu' role='menu'>
        <li><a>Uploads Image</a></li>
        <li><a href='#'>Something else here</a></li>
        <li className='divider' />
        <li><a href='#'>Separated link</a></li>
      </ul>
    </div>
  </React.Fragment>
}
