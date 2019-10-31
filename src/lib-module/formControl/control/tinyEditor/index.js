/* global tinymce */
import React, {useEffect, useRef, useState} from 'react'
import Field from '../../field/field'
import editorConfig from './config'

export default (props) => {
  const inputRef = useRef(null)
  const { field, id, name, defaultValue } = props
  let [refEditor, setRefEditor] = useState(null)
  // const [value, setValue] = useState(defaultValue)
  const getInstance = () => document.getElementById(id)

  useEffect(() => {
    // if (!inputRef) return
    if (!refEditor) {
      tinymce.init(
        editorConfig(
          `#${id}`, // selector
          () => { // onchange
            const editorValue = tinymce.get(id).getContent()
            if (typeof props.onChange !== 'function') return
            props.onChange({ value: editorValue, name })
          },
          (editor) => {
            editor.setContent(props.field.value ? props.field.value : '')
            // tinymce.get(id).setContent(props.field.value ? props.field.value : '11111')
          }
        )
      ).then((editor) => {
        if (!refEditor) {
          tinymce.get(id).setContent(props.field.value ? props.field.value : '')
        }
      })
    } else {
      refEditor.setContent(props.field.value ? props.field.value : '')
    }
    return () => {
      if (refEditor) {
        refEditor.destroy()
      }
    }
  }, [defaultValue])

  return (
    <Field field={field}>
      <div>
        <textarea id={id} ref={inputRef} className='editor' />
      </div>
    </Field>
  )
}
