import React from 'react'

export default (props) => {
  const { children, Layout, ...otherProps } = props

  const onSubmit = event => {
    event.preventDefault()
    if (typeof props.onSubmit !== 'function') return
    props.onSubmit()
  }

  if (Layout) {
    return (
      <form onSubmit={onSubmit}>
        <Layout {...otherProps}>
          {children}
        </Layout>
      </form>
    )
  }

  

  return (
    <form onSubmit={onSubmit} role='form'>
      {children}
    </form>
  )
}
