import React from 'react'

export default (props) => {
  const {text = 'button', type = 'default', className = '', icon} = props
  const classButton = className ? `btn btn-${type} ${className}` : `btn btn-${type}`
  const onClick = () => {
    if (typeof props.onClick !== 'function') return
    props.onClick()
  }

  return <button onClick={onClick} type='button' className={classButton}>
    {text}
    {icon && <React.Fragment>&nsp; <i className={`fa ${icon}`} /></React.Fragment>}
  </button>
}
