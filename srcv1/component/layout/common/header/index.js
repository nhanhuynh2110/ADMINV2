import React from 'react'
import Logo from './logo'
import Navbar from './navbar'

export default ({user}) => {
  return <header className='main-header'>
    <Logo />
    <Navbar user={user} />
  </header>
}
