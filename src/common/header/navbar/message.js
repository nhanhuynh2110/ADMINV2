import React from 'react'

class Message extends React.PureComponent {
  render () {
    return (
      <li className='dropdown messages-menu'>
        <a className='dropdown-toggle' data-toggle='dropdown'>
          <i className='fa fa-envelope-o' />
          <span className='label label-success'>4</span>
        </a>
        <ul className='dropdown-menu'>
          <li className='header'>You have 4 messages</li>
          <li>
            <ul className='menu'>
              <li>
                <a>
                  <div className='pull-left'>
                    <img src='/img/user2-160x160.jpg' className='img-circle' alt='User Image' />
                  </div>
                  <h4>
                    Support Team
                    <small><i className='fa fa-clock-o' /> 5 mins</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a>
                  <div className='pull-left'>
                    <img src='/img/user3-128x128.jpg' className='img-circle' alt='User Image' />
                  </div>
                  <h4>
                    AdminLTE Design Team
                    <small><i className='fa fa-clock-o' /> 2 hours</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a>
                  <div className='pull-left'>
                    <img src='/img/user4-128x128.jpg' className='img-circle' alt='User Image' />
                  </div>
                  <h4>
                    Developers
                    <small><i className='fa fa-clock-o' /> Today</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a>
                  <div className='pull-left'>
                    <img src='/img/user3-128x128.jpg' className='img-circle' alt='User Image' />
                  </div>
                  <h4>
                    Sales Department
                    <small><i className='fa fa-clock-o' /> Yesterday</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
              <li>
                <a>
                  <div className='pull-left'>
                    <img src='/img/user4-128x128.jpg' className='img-circle' alt='User Image' />
                  </div>
                  <h4>
                    Reviewers
                    <small><i className='fa fa-clock-o' /> 2 days</small>
                  </h4>
                  <p>Why not buy a new awesome theme?</p>
                </a>
              </li>
            </ul>
          </li>
          <li className='footer'><a href='#'>See All Messages</a></li>
        </ul>
      </li>
    )
  }
}

export default Message
