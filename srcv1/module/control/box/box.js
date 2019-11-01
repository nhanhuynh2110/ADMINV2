import React from 'react'
import Wrapper from './wrapper'
import Header from './header'
import Body from './body'
import Footer from './footer'

export default ({children, className, title, collapsed, footerContent = null}) => {
  return (
    <Wrapper className={className} collapsed={collapsed}>
      <Header title={title} collapsed={collapsed} />
      <Body>{children}</Body>
      {footerContent && <Footer>{footerContent}</Footer>}
    </Wrapper>
  )
}