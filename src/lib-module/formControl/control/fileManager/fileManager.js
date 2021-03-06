import React from 'react'
import ContextMenu from './contextMenu'
import Header from './header'
import Breadcrumb from './breadcrumb'
import Folders from './folders'
import UploadButton from './UploadButton'
import CropPanel from './cropPanel'

class FileManager extends React.PureComponent {
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
    this.setFileArrays = this.setFileArrays.bind(this)
    this.renameFile = this.renameFile.bind(this)
    this.renameAction = this.renameAction.bind(this)
    this.toggleFormUploadDrop = this.toggleFormUploadDrop.bind(this)
    this.reset = this.reset.bind(this)
    this.uploads = this.uploads.bind(this)
    this.setUploadRef = this.setUploadRef.bind(this)
    this.callUpload = this.callUpload.bind(this)
    this.onDoubleClickFile = this.onDoubleClickFile.bind(this)
    this.selectFiles = this.selectFiles.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.modalId = ''
    this.state = {
      isCreateFolder: false,
      back: '',
      currentPath: '',
      folders: [],
      files: [],
      isActiveContextMenu: false,
      filesArray: [],
      pathRename: '',
      isUploadDrop: false,
      location: {
        x: 0,
        y: 0,
        data: {
          type: '',
          path: '',
          inputId: ''
        }
      },
      cropImage: {
        image: ''
      }
    }
  }

  closeFormCreateFolder () {
    this.setState({ isCreateFolder: false })
  }

  createFolder () {
    const {isCreateFolder} = this.state
    this.setState({ isCreateFolder: !isCreateFolder, isActiveContextMenu: false, filesArray: [] })
  }

  addFolder (e) {
    const value = e.currentTarget.value
    const {currentPath} = this.state
    const dirPath = currentPath ? currentPath + '/' + value : value
    this.props.api.fileManager.createFolder({dirPath}, (error, res) => {
      if (error) return alert('create folder fail')
      this.loadContent(currentPath)
    })
  }

  deleteFile ({ type, path }) {
    const {currentPath, filesArray} = this.state
    const paths = filesArray.map(f => currentPath ? currentPath + '/' + f : f)
    this.props.api.fileManager.delete({ paths }, (error, res) => {
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
      if (err) this.setState({ isUploadDrop: false, isCreateFolder: false, pathRename: '', isActiveContextMenu: false, back: backPath, currentPath: dirPath, folders: [], files: [] })
      this.setState({ isUploadDrop: false, isCreateFolder: false, pathRename: '', isActiveContextMenu: false, back: backPath, currentPath: dirPath, folders: res.folders, files: res.files })
    })
  }

  handleBack () {
    let newDirPath = ''
    const {currentPath} = this.state
    let dirArr = currentPath.split('/')
    if (dirArr.length === 1) newDirPath = ''
    else if (dirArr.length > 1) {
      dirArr.splice(-1, 1)
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

    const path = e.currentTarget.getAttribute('data-path')
    const type = e.currentTarget.getAttribute('data-type')
    const inputId = e.currentTarget.getAttribute('data-id')

    const location = {
      x: mouseX - locationParentX,
      y: mouseY - locationParentY,
      data: {
        type,
        path,
        inputId
      }
    }

    let filesArr = _.clone(this.state.filesArray)
    if (!filesArr.includes(path)) filesArr.push(path)

    this.setState({isActiveContextMenu: true, location, filesArray: filesArr, isUploadDrop: false})
  }

  handleClickOutsideContext () {
    if (this.state.isActiveContextMenu) {
      this.setState({isActiveContextMenu: false})
    }
  }

  componentContextMenu () {
    const {location} = this.state
    let style = {
      backgroundColor: '#c1c1c1',
      position: 'absolute',
      left: location.x,
      top: location.y,
      zIndex: '10'
    }
    const {data} = location
    return <ContextMenu style={style} handleClickOutside={this.handleClickOutsideContext}>
      <div className='file-manager-context-menu'>
        <ul className='dropdown-menu'>
          {this.props.multiple}
          <li onClick={this.createFolder}><a><i className='fa fa-folder' />New Folder</a></li>
          {data.type === 'file' && <li onClick={this.toggleFormUploadDrop}><a><i className='fa fa-image' />Crop</a></li>}
          {data.type === 'file' && <li onClick={this.selectFiles} ><a><i className='fa fa-image' />Choose</a></li>}
          <li onClick={() => this.renameAction(data)}><a><i className='fa fa-edit' />Rename</a></li>
          <li className='divider' />
          <li onClick={(() => this.deleteFile(data))}><a>Delete</a></li>
        </ul>
      </div>
    </ContextMenu>
  }

  setFileArrays (e) {
    if (!e.currentTarget.getAttribute('data-path')) return
    const pathName = e.currentTarget.getAttribute('data-path')
    let filesArr = _.clone(this.state.filesArray)
    if (e.ctrlKey) {
      if (filesArr.includes(pathName)) filesArr = filesArr.filter(el => el !== pathName)
      else filesArr.push(pathName)
    } else filesArr = [pathName]
    this.setState({ filesArray: filesArr })
  }

  renameAction (data) { this.setState({pathRename: data.path, filesArray: [data.path], isActiveContextMenu: false}) }

  renameFile (e) {
    const path = e.currentTarget.getAttribute('data-path')
    const value = e.currentTarget.value
    if (!path) this.addFolder(e)
    else {
      if (this.state.folders.find(el => el.name === value)) { return alert('file is exist!!') }

      this.props.api.fileManager.rename({ dirPath: this.state.currentPath, name: value, currentName: path }, (error, res) => {
        if (error || !res) return alert('Rename fail')
        this.loadContent(this.state.currentPath)
      })
    }
  }

  reset (e) {
    if (e.target.className !== 'file-manager-item') {
      if (e.ctrlKey) {
        if (e.target.className !== 'file-manager-item file-manager-item-active') {
          this.setState({ filesArray: [] })
        }
      } else {
        this.setState({ filesArray: [] })
      }
    }
  }

  toggleFormUploadDrop () {
    const {isUploadDrop} = this.state
    this.setState({ isUploadDrop: !isUploadDrop, isActiveContextMenu: false, filesArray: [] })
  }

  setUploadRef (input) {
    this.uploadRef = input
  }

  callUpload () {
    this.uploadRef.click()
  }

  uploads (e, options) {
    let files = e ? e.target.files : options.files
    let folder = ''
    if (options && options.folder) {
      folder = 'file-manager/' + this.state.currentPath + '/' + options.folder
    } else {
      folder = this.state.currentPath ? 'file-manager/' + this.state.currentPath : 'file-manager'
    }
    this.props.api.file.uploadFileManager(true, files, 'uploads', folder, (err, resp) => {
      // if (err) return alert(err)
      this.loadContent(this.state.currentPath)
    })
  }

  onDoubleClickFile (res) {
    if (this.props.multiple) {
      const obj = {
        paths: [res.path]
      }
      this.props.onChange(obj)
    } else {
      this.props.onChange(res)
    }
    document.getElementById(`closeModel-${this.modalId}`).click()
  }

  selectFiles () {
    if (this.props.multiple) {
      const paths = _.clone(this.state.filesArray).map(el => {
        return this.state.currentPath ? `file-manager/${this.state.currentPath}/${el}` : `file-manager/${el}`
      })
      this.props.onChange({paths})
    } else {
      const path = this.state.currentPath ? `file-manager/${this.state.currentPath}/${this.state.location.data.path}` : `file-manager/${this.state.location.data.path}`
      this.props.onChange({path: path})
    }

    document.getElementById(`closeModel-${this.modalId}`).click()
  }

  render () {
    this.modalId = this.props.triggerId ? this.props.triggerId : Math.floor(100000 + Math.random() * 900000)
    return <React.Fragment>
      {this.props.trigger
        ? this.props.trigger
        : <button data-target={`#${this.modalId}`} data-toggle='modal' type='button' className='btn btn-success'>{this.props.title || `Title`}</button>}
      {this.renderContent(`${this.modalId}`)}
      <UploadButton setRef={this.setUploadRef} onChange={this.uploads} />

    </React.Fragment>
  }

  renderContent (modalId) {
    const {isCreateFolder, folders, files, currentPath, filesArray, pathRename, isUploadDrop, location} = this.state
    const arrPath = currentPath.split('/')
    return (
      <div onClick={this.reset} className='modal file-manager' id={modalId}>

        <div className='modal-dialog modal-fluid file-manager-modal'>
          <div className='modal-content file-manager-model-content'>
            {this.state.isActiveContextMenu && this.componentContextMenu(this.props.multiple)}

            {isUploadDrop && <CropPanel onSubmit={this.uploads} onClose={() => { this.setState({ isUploadDrop: false }) }} cropImage={this.cropImage} folders={folders} currentPath={currentPath} data={location.data} />}
            <Header multiple={this.props.multiple} callUpload={this.callUpload} folders={folders} toggleFormUploadDrop={this.toggleFormUploadDrop} createFolder={this.createFolder} />
            <div className='modal-body file-manager-container'>
              <Breadcrumb arrPath={arrPath} />

              <div className='file-manager-content'>

                {currentPath && <div onClick={this.handleBack} className='file-manager-folder'>
                  <div className='file-manager-item'>
                    <a><i className='fa fa-arrow-left' /></a>
                  </div>
                  <p className='file-manager-item-name'>BACK</p>
                </div>}
                <Folders
                  addFolder={this.addFolder}
                  isNewFolder={isCreateFolder}
                  filesArray={filesArray}
                  onClick={this.setFileArrays}
                  onBlur={this.renameFile}
                  files={files}
                  onDoubleClickFile={this.onDoubleClickFile}
                  currentPath={currentPath}
                  folders={folders}
                  pathRename={pathRename}
                  showItemFolder={this.showItemFolder}
                  handleContextMenu={this.handleContextMenu} />
              </div>

            </div>
            <div className='modal-footer'>
              <button id={`closeModel-${modalId}`} type='button' className='btn btn-default pull-left' data-dismiss='modal'>Close</button>
              {/* <button type='button' className='btn btn-primary'>Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (props) => {
  return <FileManager {...props} />
}
