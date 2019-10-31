import React from 'react'
import {Link} from 'react-router-dom'

export default () => {
  return <Link to='/' className='logo'>
    <span className='logo-mini'>
      <b>AAAA</b>
      LT
    </span>
    <span className='logo-lg'>
      <b>Admin</b>
      LTE
    </span>
  </Link>
}
