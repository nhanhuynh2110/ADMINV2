import React from 'react'
import Header from './header'

export default ({title, link, children}) => {
  return <div className='grid-common'>
    <section className='content'>
      <div className='row'>
        <div className='col-xs-12'>
          <div className='box box-success'>
            <Header title={title} link={link} />
            <div className='nav-tabs-custom'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
}
