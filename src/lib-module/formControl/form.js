import React from 'react'

export default (props) => {
  const { children, Layout, ...otherProps } = props

  if (Layout) {
    return (
      <Layout {...otherProps}>
        {children}
      </Layout>
    )
  }

  return (
    <form role='form'>
      {children}
    </form>
  )
}
