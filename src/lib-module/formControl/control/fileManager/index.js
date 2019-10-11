import React from 'react'
import { withContainer } from '../../../../context'
import FormFolder from './create.folder'

export default class FileManager extends React.PureComponent {

  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.createFolder = this.createFolder.bind(this)
    this.state = {
      isCreateFolder: false,
      currentPath: '/'
    }
  }

  handleClick (e) {
    console.log(11111111111111111)
  }

  createFolder () {
    const {isCreateFolder} = this.state
    
    this.setState({ isCreateFolder: !isCreateFolder })
  }

  render () {
    const {isCreateFolder} = this.state
    const {api} = this.props
    return <>
      <button data-target='#modal-default1' data-toggle='modal' type='button' className='btn btn-primary'>Add Style</button>

      <div className='modal file-manager' id='modal-default1'>
          <div className='modal-dialog modal-fluid file-manager-modal'>
            <div className='modal-content'>
              <div className='modal-header'>
                <div className='groups-buttons' onClick={this.createFolder} >
                  <a><i className='fa fa-upload' /></a>
                  <a><i className='fa fa-plus' /> <i className='fa fa-folder' /></a>
                </div>
              </div>
              
              <div className='modal-body file-manager-container'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a href='#'><i className='fa fa-home' /> Home</a></li>
                    <li className='breadcrumb-item'><a href='#'>Library</a></li>
                    <li className='breadcrumb-item active' aria-current='page'>Data</li>
                  </ol>
                </nav>

                {isCreateFolder && <FormFolder api={api} />}

                <div className='file-manager-content' onContextMenu={this.handleClick}>
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div>
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div> 
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div> 
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div> 
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div>  
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div> 
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div> 
                  <div className='file-manager-folder'>
                    <a><i className='fa fa-folder' /></a>
                    <p>abc xyz</p>
                  </div>


                </div>

              </div>
              <div className='modal-footer'>
                {/* <button type='button' className='btn btn-default pull-left' data-dismiss='modal'>Close</button>
                <button type='button' className='btn btn-primary'>Save changes</button> */}
              </div>
            </div>
          </div>
        </div>
    </>
  }
}