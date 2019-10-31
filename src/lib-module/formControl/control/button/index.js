import React from 'react'

export default (props) => {
  const {text = 'button', type = 'default', className = '', icon, iconPosition} = props
  const classButton = className ? `btn btn-${type} ${className}` : `btn btn-${type}`
  const onClick = () => {
    if (typeof props.onClick !== 'function') return
    props.onClick()
  }

  let iconP = 'after'
  if (icon) {
    if (iconPosition) iconP = iconPosition
  }

  return <button onClick={onClick} type='button' className={classButton}>
    {icon && iconP === 'before' && <React.Fragment><i className={`fa ${icon}`} /> &nbsp; </React.Fragment>}
    {text}
    {icon && iconP === 'after' && <React.Fragment>
      &nbsp; <i className={`fa ${icon}`} />
    </React.Fragment>}
  </button>
}
