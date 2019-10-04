import React from 'react'

export default (props) => {
  const {title, data} = props
  return <React.Fragment>
    <form role='form'>
      <div className='box-body'>
        {props.children}
      </div>
    </form>
  </React.Fragment>
}
