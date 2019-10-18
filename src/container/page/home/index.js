import React from 'react'

export default class Grid extends React.Component {
  render () {
    return (
      <div className='grid-common'>
        <section className='content'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='box'>
                <div className='box-header with-border'>
                  <h3 className='box-title'>Hướng Dẫn Sử Dụng Phần Mềm Quản Lý</h3>
                  <div className='box-tools pull-right'>
                    <button type='button' className='btn btn-box-tool' data-widget='collapse'><i className='fa fa-minus'></i>
                    </button>
                    <div className='btn-group'>
                      <button type='button' className='btn btn-box-tool dropdown-toggle' data-toggle='dropdown'>
                        <i className='fa fa-wrench'></i></button>
                      <ul className='dropdown-menu' role='menu'>
                        <li><a href='#'>Action</a></li>
                        <li><a href='#'>Another action</a></li>
                        <li><a href='#'>Something else here</a></li>
                        <li className='divider'></li>
                        <li><a href='#'>Separated link</a></li>
                      </ul>
                    </div>
                    <button type='button' className='btn btn-box-tool' data-widget='remove'><i className='fa fa-times'></i></button>
                  </div>
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-md-12'>
                      aaaaaa
                    </div>
                  </div>
                </div>
                <div className='box-footer'>
                  <div className='row'>
                    <div className='col-md-12'>
                      bbbb
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
