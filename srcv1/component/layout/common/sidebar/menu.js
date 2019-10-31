import React from 'react'
import MenuContent from './menuContent'

export default ({menu}) => {
  return <ul className='sidebar-menu'>
    <li><a><i className='fa fa-dashboard' /><span>Dashboard</span></a></li>
    {menu && menu.map((row, i) => {
      return row.permission && <MenuContent key={i} title={row.title} items={row.childItem} icon={row.icon} />
    })}
  </ul>
}
