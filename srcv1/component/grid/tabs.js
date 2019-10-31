import React from 'react'

export default (props) => {
  const { options } = props
  const [current, setCurrent] = React.useState(options[0].key)
  const onTabs = (item) => {
    setCurrent(item.key)
    if (typeof props.onChange !== 'function') return
    props.onChange(item)
  }
  return (
    <ul className='nav nav-tabs'>
      {options.map(item => {
        return <li key={item.key} className={current === item.key ? 'active' : ''}>
          <a data-toggle='tab' data-tab='name' onClick={() => onTabs(item)}>{item.text}</a>
        </li>
      })}
    </ul>
  )
}
