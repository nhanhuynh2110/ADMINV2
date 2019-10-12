import React from 'react'

export default ({folders = [], showItemFolder, handleContextMenu }) => {
  return <>
    {folders.map((el, k) => {
      return <div
        onDoubleClick={() => showItemFolder(el.name)}
        key={`folder-${k}`}
        className='file-manager-folder'>
        <div
          onContextMenu={handleContextMenu}
          data-type='folder'
          data-path={el.name}
          className='file-manager-item'>
          <a><i className='fa fa-folder' /></a>
        </div>
        <p className='file-manager-item-name'>{el.name}</p>
      </div>
    })}
  </>
}