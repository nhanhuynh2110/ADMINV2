import React from 'react'
import {withContainer } from '../../context'

import config from '../../../config'

let domain = config.server.domain

class UserPanel extends React.PureComponent {
  render() {
    let { currentUser } = this.props
    console.log('current User', currentUser,  domain +  currentUser.avatar )
    return (
      <div className='user-panel'>
        <div className='pull-left image'>
          <img src={currentUser.avatar ? domain +  currentUser.avatar : 'img/user2-160x160.jpg'} className='img-circle' alt='User Image'/>
          {/* <img src={domain + currentUser.avatar} className='img-circle' alt='User Image'/> */}
        </div>
        <div className='pull-left info'>
          <p>{(currentUser.fullname)? currentUser.fullname : ''}</p>
          <a><i className='fa fa-circle text-success'></i> Online</a>
        </div>
      </div>
    )
  }
}

export default withContainer(UserPanel, (c) => ({
  currentUser: c.data.currentUser
}))
