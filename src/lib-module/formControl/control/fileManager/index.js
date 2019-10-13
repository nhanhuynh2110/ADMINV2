import React from 'react'
import FormFolder from './create.folder'
import ContextMenu from './contextMenu'
import Header from './header'
import Breadcrumb from './breadcrumb'
import Folders from './folders'
import Files from './files'


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
    this.handleClickOutsideFile = this.handleClickOutsideFile.bind(this)
    this.setFileArrays = this.setFileArrays.bind(this)
    this.addFileArrays = this.addFileArrays.bind(this)
    this.state = {
      isCreateFolder: false,
      back: '',
      currentPath: '',
      folders: [],
      files: [],
      isActiveContextMenu: false,
      filesArray: [],
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

  handleClickOutsideFile () {
    console.log('111 handleClickOutside')
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

  setFileArrays (e) {
    if (!e.currentTarget.getAttribute('data-path')) return
    const pathName = e.currentTarget.getAttribute('data-path')
    let filesArr = _.clone(this.state.filesArray)
    if (e.ctrlKey) filesArr.push(pathName)
    else filesArr = [pathName]
    this.setState({ filesArray: filesArr})
  }

  addFileArrays (e) {
    // console.log(e.which)
  }

  render () {
    const {isCreateFolder, folders, files, currentPath, filesArray} = this.state
    const arrPath = currentPath.split('/')
    const {api} = this.props
    return <>
      <button data-target='#modal-default1' data-toggle='modal' type='button' className='btn btn-primary'>Add Style</button>

      <div className='modal file-manager' id='modal-default1'>
          <div className='modal-dialog modal-fluid file-manager-modal'>
            <div className='modal-content file-manager-model-content'>
            {this.state.isActiveContextMenu && this.componentContextMenu()}
              
              <Header createFolder={this.createFolder} />
              
              <div className='modal-body file-manager-container'>
                <Breadcrumb arrPath={arrPath} />

                {isCreateFolder && <FormFolder currentPath={currentPath} api={api} onClose={this.closeFormCreateFolder} addFolder={this.addFolder}/>}
                
                <div className='file-manager-content'>
                  
                  {currentPath && <div onClick={this.handleBack} className='file-manager-folder'>
                    <div className='file-manager-item'>
                      <a><i className='fa fa-arrow-left' /></a>
                    </div>
                    <p className='file-manager-item-name'>BACK</p>
                  </div>}
                    <Folders
                      handleClickOutside = {this.handleClickOutsideFile}
                      filesArray={filesArray}
                      onClick={this.setFileArrays}
                      folders={folders}
                      showItemFolder={this.showItemFolder}
                      handleContextMenu={this.handleContextMenu} />
                    <Files
                      files={files}
                      filesArray={filesArray}
                      onClick={this.setFileArrays}
                      handleContextMenu={this.handleContextMenu} />
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