import React from 'react'

export default ({arrPath = []}) => {
  return <nav aria-label='breadcrumb'>
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'><a><i className='fa fa-home' /> Home</a></li>
      {arrPath.map((el, k) => {
        if (el.length === (k + 1)) return <li key={el} className='breadcrumb-item active' aria-current='page'>{el}</li>
        return <li key={el} className='breadcrumb-item'><a>{el}</a></li>
      })}
    </ol>
  </nav>
}
