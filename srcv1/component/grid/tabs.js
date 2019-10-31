import React from 'react'

export default (props) => {
  const { options, active } = props
  // const [current, setCurrent] = React.useState(active.key)
  const onTabs = (item) => {
    // setCurrent(item.key)
    if (typeof props.onChange !== 'function') return
    props.onChange(item)
  }
  return (
    <ul className='nav nav-tabs'>
      {options.map(item => {
        return <li key={item.key} className={active === item.key ? 'active' : ''}>
          <a data-toggle='tab' data-tab='name' onClick={() => onTabs(item)}>{item.text}</a>
        </li>
      })}
    </ul>
  )
}
