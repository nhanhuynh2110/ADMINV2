import React from 'react'
import Header from './common/header'
import SideBar from './common/sidebar'
import Footer from './common/footer'

export default ({user, menu, children}) => {
  return <React.Fragment>
    <Header user={user} />
    <SideBar menu={menu} user={user} />
    <div className='content-wrapper'>
      <section className='content-header'>
        <h1> Admin System <small>Control panel</small> </h1>
        <ol className='breadcrumb'>
          <li><a href='#'><i className='fa fa-dashboard' /> Home</a></li>
          <li className='active'>Dashboard</li>
        </ol>
      </section>
      {children}
    </div>
    <Footer />
  </React.Fragment>
}
