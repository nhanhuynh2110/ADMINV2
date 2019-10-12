import React from 'react'

export default ({files = [], handleContextMenu }) => {
  return <>
    {files.map((el, k) => {
      return <div
        key={`files-${k}`}
        className='file-manager-folder'>
        <div
          data-type='file'
          data-path={el.name}
          onContextMenu={handleContextMenu}
          className='file-manager-item'>
          <img className='file-manager-item-file' src={`${pathFileManager}/${el.name}`} />
        </div>
        <p className='file-manager-item-name'>{el.name}</p>
      </div>
    })}
  </>
}