import React from 'react'
import UserPanel from './userPanel'
import Search from './search'
import Menu from './menu'

export default ({user, menu}) => {
  return <aside className='main-sidebar'>
    <section className='sidebar'>
      <UserPanel user={user} />
      <Search />
      <Menu menu={menu} />
    </section>
  </aside>
}
