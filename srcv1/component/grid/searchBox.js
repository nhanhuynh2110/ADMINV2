import React from 'react'

export default ({onChange}) => {
  const ref = React.useRef(null)
  let timeout = null
  const onChangeDelay = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => onChange(ref.current.value), 500)
  }

  return <div id='example1_filter' className='dataTables_filter'>
    <label>Tìm Kiếm :</label>
    <input ref={ref} onChange={onChangeDelay} type='search' className='form-control input-sm' placeholder='' aria-controls='example1' />
    <div className='clearfix' />
  </div>
}