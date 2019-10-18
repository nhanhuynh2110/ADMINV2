/* global tinymce */
import React, {useEffect, useRef, useState} from 'react'
import Field from '../../field/field'
import editorConfig from './config'

export default (props) => {
  const inputRef = useRef(null)
  const { field, id, name, defaultValue } = props
  // const [value, setValue] = useState(defaultValue)

  const getInstance = () => document.getElementById(id)

  useEffect(() => {
    if (!inputRef) return

    const inputInstance = tinymce.get(id)

    if (!inputInstance) {
      tinymce.init(
        editorConfig(
          `#${id}`, // selector
          () => { // onchange
            const editorValue = tinymce.get(id).getContent()
            if (typeof props.onChange !== 'function') return
            props.onChange({ value: editorValue, name })
          }
        )
      ).then(editor => {
        if (defaultValue) editor.setContent(defaultValue)
      })
    } else {
      getInstance().innerHTML = defaultValue
    }
    // inputRef && !editorInit && tinymce.init(

    // )

    // if (editorInit) {
    //   console.log(editorInit, value)
    // }
    // editorInit && value && tinymce.get(id).setContent(value)
  })

  return (
    <Field field={field}>
      <div>
        <textarea id={id} ref={inputRef} className='editor' />
      </div>
    </Field>
  )
}
