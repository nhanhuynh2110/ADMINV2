import React from 'react'
import { withContainer } from '../../../../context'
import FormFolder from './create.folder'
import conf from '../../../../../config'
import ContextMenu from './contextMenu'

const domain = conf.server.domain

const pathFileManager = domain +  '/file-manager'

export default class FileManager extends React.PureComponent {

  constructor (props) {
    super(props)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.createFolder = this.createFolder.bind(this)
    this.closeFormCreateFolder = this.closeFormCreateFolder.bind(this)
    this.loadContent = this.loadContent.bind(this)
    this.showItemFolder = this.showItemFolder.bind(this)
    this.addFolder = this.addFolder.bind(this)
    this.deleteFile = this.deleteFile.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.componentContextMenu = this.componentContextMenu.bind(this)
    this.handleClickOutsideContext = this.handleClickOutsideContext.bind(this)
    this.state = {
      isCreateFolder: false,
      back: '',
      currentPath: '',
      folders: [],
      files: [],
      isActiveContextMenu: false,
      location: {
        x: 0,
        y: 0,
        data: {
          type: '',
          path: ''
        }
      }
    }
  }

  closeFormCreateFolder () {
    this.setState({ isCreateFolder: false })
  }

  createFolder () {
    const {isCreateFolder} = this.state
    this.setState({ isCreateFolder: !isCreateFolder })
  }

  addFolder (isSuccess) {
    if (isSuccess) this.loadContent(this.state.currentPath)
  }

  deleteFile ({ type, path }) {
    const {currentPath} = this.state
    const dirPath = currentPath ? currentPath + '/' + path : path
    this.props.api.fileManager.delete({ path: dirPath }, (error, res) => {
      if (error || !res) return alert('delete fail')
      this.loadContent(currentPath)
    })
  }

  showItemFolder (path) {
    const {currentPath} = this.state
    const dirPath = currentPath ? currentPath + '/' + path : path
    this.loadContent(dirPath)
  }

  componentDidMount () {
    this.loadContent()
  }

  loadContent (dirPath = '') {
    let backPath = ''
    const arrPath = dirPath.split('/')
    if (arrPath.length === 1) backPath = ''
    else if (arrPath.length > 1) {
      arrPath.splice(-1, 1)
      backPath = arrPath.join('/')
    }
    this.props.api.fileManager.getContent({dirPath}, (err, res) => {
      if (err) this.setState({ isActiveContextMenu: false, back: backPath, currentPath: dirPath, folders: [], files: [] })
      this.setState({ isActiveContextMenu: false, back: backPath, currentPath: dirPath, folders: res.folders, files: res.files })
    })
  }

  handleBack () {
    let newDirPath = ''
    const {currentPath} = this.state
    let dirArr = currentPath.split('/')
    if (dirArr.length === 1) newDirPath = ''
    else if (dirArr.length > 1) {
      dirArr.splice(-1,1)
      newDirPath = dirArr.join('/')
    }

    this.loadContent(newDirPath)
  }

  handleContextMenu (e) { 
    e.preventDefault()
    const locationParentDom = document.getElementsByClassName('modal-content')[0]
    const locationParent = locationParentDom.getBoundingClientRect()
    const locationParentX = locationParent.x
    const locationParentY = locationParent.y

    const mouseX = e.clientX
    const mouseY = e.clientY
    const location = {
      x: mouseX - locationParentX,
      y:  mouseY - locationParentY,
      data: {
        type: e.currentTarget.getAttribute('data-type'),
        path: e.currentTarget.getAttribute('data-path')
      }
    }
    this.setState({isActiveContextMenu: true, location})
  }

  handleClickOutsideContext () {
    if (this.state.isActiveContextMenu) {
      this.setState({isActiveContextMenu: false})
    }
  }
  
  componentContextMenu () {
    const {location} = this.state
    let style = {
      backgroundColor : '#c1c1c1',
      position: 'absolute',
      left: location.x,
      top: location.y,
      zIndex: '10'
    }
    const {data} = location
    return <ContextMenu style={style} handleClickOutside={this.handleClickOutsideContext}>
      <div className='file-manager-context-menu'>
        <ul className='dropdown-menu'>
          <li><a><i className='fa fa-folder' />New Folder</a></li>
          <li><a><i className='fa fa-edit' />Rename</a></li>
          <li className='divider'></li>
          <li onClick={(() => this.deleteFile(data))}><a>Delete</a></li>
        </ul>
      </div>
    </ContextMenu>
  }

  render () {
    const {isCreateFolder, folders, files, currentPath} = this.state
    const arrPath = currentPath.split('/')
    const {api} = this.props
    return <>
      <button data-target='#modal-default1' data-toggle='modal' type='button' className='btn btn-primary'>Add Style</button>

      <div className='modal file-manager' id='modal-default1'>
          <div className='modal-dialog modal-fluid file-manager-modal'>
            <div className='modal-content'>
            {this.state.isActiveContextMenu && this.componentContextMenu()}
              <div className='modal-header'>
                <div className='groups-buttons' onClick={this.createFolder} >
                  <a><i className='fa fa-arrow-left' /></a>
                  <a><i className='fa fa-upload' /></a>
                  <a><i className='fa fa-plus' /> <i className='fa fa-folder' /></a>
                </div>
              </div>
              
              <div className='modal-body file-manager-container'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a><i className='fa fa-home' /> Home</a></li>
                    {arrPath.map((el, k) => {
                      if (el.length === (k + 1)) return <li className='breadcrumb-item active' aria-current='page'>{el}</li>
                      return <li className='breadcrumb-item'><a>{el}</a></li>
                    })}
                  </ol>
                </nav>

                {isCreateFolder && <FormFolder
                  currentPath={currentPath}
                  api={api}
                  onClose={this.closeFormCreateFolder}
                  addFolder={this.addFolder}/>}
                
                <div className='file-manager-content'>
                  
                  {currentPath && <div onClick={this.handleBack} className='file-manager-folder'>
                    <div className='file-manager-item'>
                      <a><i className='fa fa-arrow-left' /></a>
                    </div>
                    <p className='file-manager-item-name'>BACK</p>
                  </div>}
                  {folders.map((el, k) => {
                    return <div
                      onDoubleClick={() => this.showItemFolder(el.name)}
                      key={`folder-${k}`}
                      className='file-manager-folder'>
                      <div
                        onContextMenu={this.handleContextMenu}
                        data-type='folder'
                        data-path={el.name}
                        className='file-manager-item'>
                        <a><i className='fa fa-folder' /></a>
                      </div>
                      <p className='file-manager-item-name'>{el.name}</p>
                    </div>
                  })}

                  {files.map((el, k) => {
                    return <div
                      key={`files-${k}`}
                      className='file-manager-folder'>
                      <div
                        data-type='file'
                        data-path={el.name}
                        onContextMenu={this.handleContextMenu}
                        className='file-manager-item'>
                        <img className='file-manager-item-file' src={`${pathFileManager}/${el.name}`} />
                      </div>
                      <p className='file-manager-item-name'>{el.name}</p>
                    </div>
                  })}
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