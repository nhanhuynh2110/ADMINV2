import React from 'react'
import conf from '../../../../../config'

const domain = conf.server.domain
const pathFileManager = domain +  '/file-manager'

export default (props) => {
  const {files = [], handleContextMenu, filesArray = [], style, currentPath } = props

  const onClick = (e) => {
    if (typeof props.onClick !== 'function') return
    props.onClick(e)
  }
  return <>
    {files.map((el, k) => {
      const classNameItem = filesArray.includes(el.name) ? 'file-manager-item file-manager-item-active' : 'file-manager-item'
      const image = currentPath ? `${pathFileManager}/${currentPath}/${el.name}` : `${pathFileManager}/${el.name}`
      return <div
        onClick={onClick}
        data-path={el.name}
        key={`files-${k}`}
        className='file-manager-folder'>
        <div
          data-type='file'
          data-path={el.name}
          onContextMenu={handleContextMenu}
          className={classNameItem}>
          <img className='file-manager-item-file' src={image} />
        </div>
        <p className='file-manager-item-name'>{el.name}</p>
      </div>
      
    })}
  </>
}