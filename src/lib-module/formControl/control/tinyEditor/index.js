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
            editor.setContent(props.field.value ? props.field.value : '11111')
            // tinymce.get(id).setContent(props.field.value ? props.field.value : '11111')
          }
        )
      ).then((editor) => {
        if (!refEditor) {
          tinymce.get(id).setContent(props.field.value ? props.field.value : '11111')
        }
      })
    } else {
      refEditor.setContent(props.field.value ? props.field.value : '11111')
    }
    
    // .then(editor => {
    //   // console.log('editor', editor)
    //   // if (editor.length > 0) editor[0].setContent(props.field.value ? props.field.value : '11111')
    //   // console.log('tinymce', tinymce.get(id))
    //   tinymce.get(id).setContent(props.field.value ? props.field.value : '11111')
    //   // console.log('props.field.value', props.field.value)
    //   // getInstance().html = props.field.value ? props.field.value : '11111'
    //   // tinymce.get(id).setContent(props.field.value ? props.field.value : '11111')
    //   // editor[0].setContent(props.field.value ? props.field.value : '11111')
    // })

    

    // editor[0].setContent(props.field.value ? props.field.value : '11111')

    // const inputInstance = tinymce.get(id)

    // if (!inputInstance) {
    //   tinymce.init(
    //     editorConfig(
    //       `#${id}`, // selector
    //       () => { // onchange
    //         const editorValue = tinymce.get(id).getContent()
    //         if (typeof props.onChange !== 'function') return
    //         props.onChange({ value: editorValue, name })
    //       }
    //     )
    //   ).then(editor => {
    //     editor[0].setContent(props.field.value ? props.field.value : '11111')
    //   })
    // } else {
    //   // console.log('props.field.value', props.field.value)
    //   // getInstance().html = props.field.value ? props.field.value : ''
    //   // inputRef.current.value = props.field.value ? props.field.value : ''
    //   if (tinymce.get(id)) {
    //     $('#' + id).html(props.field.value ? props.field.value : 1)
    //     // getInstance().html = props.field.value ? props.field.value : ''
    //     // $(`#${id}`).val(props.field.value ? props.field.value : '')
    //     // tinymce.activeEditor.targetElm.html = props.field.value ? props.field.value : ''
    //     // console.log(tinymce.activeEditor.targetElm.html = )
    //     // tinymce.activeEditor.setContent(props.field.value ? props.field.value : '');
    //   }
    // }
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
