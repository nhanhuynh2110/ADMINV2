import React from 'react'
import conf from '../../../../config'

const domain = conf.server.domain

export default (props) => {
  const {groupImage, closeSideBar} = props
  if (!groupImage) return null
  return <React.Fragment>
    <div className='sidebar-images-bg' onClick={closeSideBar} />
    <div className='sidebar-images content'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <h3 className='box-title'>Image</h3>
            </div>
            <div className='box-body'>
              <div className='row'>
                <div className='col-md-12 text-center'>
                  <img className='sidebar-main-image' src={`${domain}/${groupImage.mainImage}`} />
                </div>
                <div className='col-md-12 text-center'>
                  <button type='button'
                    onClick={props.showFileManager}
                    className='btn btn-success'>Gallery Image &nbsp; <i className='fa fa-plus' /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
}
