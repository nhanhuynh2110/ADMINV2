import React, {useEffect, useRef, createRef} from 'react'
import ContextMenu from './contextMenu'

export default (props) => {
  const {folders = [], showItemFolder, handleContextMenu, filesArray = [], style, pathRename, isNewFolder } = props
  let refs = useRef(new Map()).current
  let refNewFolder = useRef(null)
  let isFocus = ''
  const onClick = (e) => {
    if (typeof props.onClick !== 'function') return
    props.onClick(e)
  }

  const onKeyDown = (e) => {
    if (typeof props.onBlur !== 'function') return
    if (e.key === 'Enter') {
      e.preventDefault()
      props.onBlur(e)
    }
  }

  const onBlur = (e) => {
    if (typeof props.onBlur !== 'function') return
    props.onBlur(e)
  }

  useEffect (() => {
    if (isFocus !== '') {
      refs.get(isFocus).value = folders[isFocus].name
      refs.get(isFocus).focus()
    }

    if (isNewFolder) {
      refNewFolder.current.focus()
    }
  }, [pathRename, isNewFolder])


  return <>
    {isNewFolder && <div className='file-manager-folder'>
      <div
        data-type='folder'
        className='file-manager-item'>
        <a><i className='fa fa-folder' /></a>
      </div>
      <div>
        <input
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={refNewFolder}
          defaultValue='New Folder'
          className='file-manager-item-input'
          />
      </div>
    </div>}
    {folders.map((el, k) => {
      const isRename = pathRename === el.name
      if (isRename) isFocus = k
      const classNameItem = filesArray.includes(el.name) ? 'file-manager-item file-manager-item-active' : 'file-manager-item'
      return <div
        onClick={onClick}
        onDoubleClick={() => !isRename ? showItemFolder(el.name) : false}
        key={`folder-${k}`}
        data-path={el.name}
        className='file-manager-folder'>
        <div
          onContextMenu={handleContextMenu}
          data-type='folder'
          data-path={el.name}
          data-id={`input-path-${k}`}
          className={classNameItem}>
          <a><i className='fa fa-folder' /></a>
        </div>
        <div>
          {isRename
            ? <input
              ref={inst => inst === null ? refs.delete(k) : refs.set(k, inst)}
              id={`input-path-${k}`}
              data-path={el.name}
              onBlur={onBlur}
              className='file-manager-item-input'
              defaultValue={el.name}
              onKeyDown={onKeyDown}
              />
            : <p className='file-manager-item-name'>{el.name}</p>
          }
        </div>

      </div>
    })}
  </>
}
