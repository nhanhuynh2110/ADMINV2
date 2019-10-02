import React from 'react'

export default (props) => {
  const { children, Layout } = props

  if (Layout) {
    return (
      <Layout>
        {children}
      </Layout>
    )
  }

  return (
    <form role='form'>
      Form Group
      {children}
    </form>
  )
}
