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
                <button type='button' className='btn btn-box-tool' onClick={closeSideBar}><i className='fa fa-times' /></button>
              </div>
            </div>
            <div className='box-body'>

              {/* Main image */}
              <div className='form-group'>
                <label>Main Image</label>
                <div className='position-relative image-wrapper' onClick={() => showFileManager({position: 'mainImage'})}>
                  <img className='sidebar-main-image camera-image' src={`${domain}/${groupImage.mainImage}`} />
                  <div className='camera-image-upload-image' >
                    <i className='fa fa-camera' />
                  </div>
                </div>
              </div>

              {/* slider detail image */}
              <div className='form-group'>
                <label>Slider Detail</label>
                <div className='image-wrapper'>
                  <div className='d-inline position-relative image-wrapper' onClick={() => showFileManager({position: 'sliderDetailImage'})}
                    style={{width: '200px', height: '100px', backgroundImage: `url(${domain}/${groupImage.sliderDetailImage})`}}>
                    {groupImage && groupImage.sliderDetailImage
                      ? <React.Fragment>
                        <div className='camera-image-upload-image' >
                          <i className='fa fa-camera' />
                        </div>
                      </React.Fragment>
                      : <React.Fragment>
                        <div className='camera-image-upload-image' style={{display: 'flex'}}>
                          <i className='fa fa-camera' />
                        </div>
                      </React.Fragment>
                    }
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
