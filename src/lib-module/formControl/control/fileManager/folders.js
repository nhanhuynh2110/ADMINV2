import React from 'react'
import ContextMenu from './contextMenu'

export default (props) => {
  const {folders = [], showItemFolder, handleContextMenu, filesArray = [], style } = props

  const onClick = (e) => {
    if (typeof props.onClick !== 'function') return
    props.onClick(e)
  }

  const onKeyDown = (e) => {
    if (typeof props.onKeyDown !== 'function') return
    props.onKeyDown(e)
  }

  return <>
    {folders.map((el, k) => {
      const classNameItem = filesArray.includes(el.name) ? 'file-manager-item file-manager-item-active' : 'file-manager-item'
      return <ContextMenu style={style} handleClickOutside={props.handleClickOutside}>
        <div
          onClick={onClick}
          onDoubleClick={() => showItemFolder(el.name)}
          onKeyDown={onKeyDown}
          key={`folder-${k}`}
          data-path={el.name}
          className='file-manager-folder'>
          <div
            onContextMenu={handleContextMenu}
            data-type='folder'
            data-path={el.name}
            className={classNameItem}>
            <a><i className='fa fa-folder' /></a>
          </div>
          <p className='file-manager-item-name'>{el.name}</p>
        </div>
      </ContextMenu>
      
    })}
  </>
}