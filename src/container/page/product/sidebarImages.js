import React from 'react'
import conf from '../../../../config'

const domain = conf.server.domain

export default (props) => {
  const {groupImage, closeSideBar, showFileManager} = props
  if (!groupImage) return null
  return <React.Fragment>
    <div className='sidebar-images-bg' onClick={closeSideBar} />
    <div className='sidebar-images content'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{groupImage.mainImage}</h3>
              <div className='box-tools pull-right'>

                <button type='button' class='btn btn-box-tool' onClick={closeSideBar}><i class='fa fa-times' /></button>
              </div>
            </div>
            <div className='box-body'>
              <div className='row form-group'>
                <div className='col-md-12 text-center'>
                  <img className='sidebar-main-image' src={`${domain}/${groupImage.mainImage}`} />
                </div>
              </div>
              <div className='row'>
                

                <div className='col-md-12 text-center'>
                  <div className='d-inline position-relative' onClick={() => showFileManager({position: 'sliderDetailImage'})} style={{width: '200px', height: '100px'}}>
                    {groupImage && groupImage.sliderDetailImage ?
                      <img className='w-100 h-100 camera-image' src={`${domain}/${groupImage.sliderDetailImage}`} />
                      : <img className='w-100 h-100 camera-image' />
                    }
                    
                    <div className='camera-image-upload-image'>
                      <i className='fa fa-camera' />
                    </div>
                  </div>
                    
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
}
