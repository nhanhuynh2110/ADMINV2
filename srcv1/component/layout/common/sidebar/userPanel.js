import React from 'react'

export default ({user}) => {
  return <div className='user-panel'>
    <div className='pull-left image'>
      <img src='/img/user2-160x160.jpg' className='img-circle' alt='User Image' />
    </div>
    <div className='pull-left info'>
      <p>{(user.fullname) ? user.fullname : ''}</p>
      <a><i className='fa fa-circle text-success' /> Online</a>
    </div>
  </div>
}
