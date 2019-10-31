import React from 'react'
import {Link} from 'react-router-dom'

export default (props) => {
  const {icon, title, items, active} = props
  return (
    <li className={active && 'treeview active'} >
      <a>
        <i className={icon} />
        <span>{title}</span>
        <span className='pull-right-container'>
          <i className='fa fa-angle-left pull-right' />
        </span>
      </a>
      <ul className='treeview-menu'>
        {items.map((row, i) => {
          return row.permission
            ? <li key={i} className='active'>
              <Link to={row.link}><i className='fa fa-circle-o' />{row.text}</Link>
            </li>
            : null
        })}
      </ul>
    </li>
  )
}
