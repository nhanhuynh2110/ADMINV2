import React from 'react'
import {Link} from 'react-router-dom'

export default ({ title = '', link = '' }) => {
  return <div className='box-header'>
    <h3 className='box-title'>{title}</h3>
    <div className='box-tools pull-right'>
      <div className='pull-right mb-10 hidden-sm hidden-xs'>
        <div className='btn-group'>
          <button type='button' className='btn btn-success btn-flat'>Action</button>
          <button type='button' className='btn btn-success btn-flat dropdown-toggle' data-toggle='dropdown'>
            <span className='caret' />
            <span className='sr-only'>Toggle Dropdown</span>
          </button>
          <ul className='dropdown-menu' role='menu'>
            <li><Link to={link}>Create</Link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
}
