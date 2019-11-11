import React from 'react'

class Logo extends React.Component {
  render () {
    return (
      <a href='/' className='logo'>
        <span className='logo-mini'>
          <b>CT</b>
        </span>
        <span className='logo-lg'>
          <b>Control</b>
        </span>
      </a>
    )
  }
}

export default Logo
