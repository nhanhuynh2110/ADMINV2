import React from 'react'
import {Link} from 'react-router-dom'
import { formatDate } from '../../../../../utils'
import config from '../../../../../../config'

let domain = config.server.domain

export default ({user}) => {
  return (
    <li className='dropdown user user-menu'>
      <a className='dropdown-toggle' data-toggle='dropdown'>
        <img
          src={user.avatar ? domain + user.avatar : 'img/user2-160x160.jpg'}
          className='user-image'
          alt='User Image'
        />
        <span className='hidden-xs'>
          {user.fullname ? user.fullname : ''}
        </span>
      </a>
      <ul className='dropdown-menu'>
        <li className='user-header'>
          <img
            src={user.avatar ? domain + user.avatar : 'img/user2-160x160.jpg'}
            className='img-circle'
            alt='User Image'
          />
          <p>
            {user.fullname ? user.fullname : ''}
            <small>
              {user.birthday && formatDate(user.birthday)}
            </small>
          </p>
        </li>
        <li className='user-body'>
          <div className='row'>
            <div className='col-xs-12 text-center'>
              <a href='/change-password'>Đổi mật khẩu</a>
            </div>
          </div>
        </li>
        <li className='user-footer'>
          <div className='pull-left'>
            <Link to='/profile' className='btn btn-default btn-flat'>Profile</Link>
          </div>
          <div className='pull-right'>
            <a href='/login' className='btn btn-default btn-flat'>
              Đăng xuất
            </a>
          </div>
        </li>
      </ul>
    </li>
  )
}
