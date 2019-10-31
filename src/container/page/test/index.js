import React, {useState, useEffect, useRef} from 'react'
import { Basic } from 'form-layout'
import { withContainer } from '../../../context'
// import 'medium-draft/lib/index.css'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import {
//   Editor, createEditorState
// } from 'medium-draft'

// import { Editor } from 'react-draft-wysiwyg'

export default () => {

  // const [editorState, setEditorState] = useState(createEditorState())
  // const ref = useRef(null)

  // useEffect(() => {
  //   ref.current.focus()
  // })
  // const onChange = (editorStateValue) => {
  //   setEditorState(editorStateValue)
  // }
  return <Basic>
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor

        editor={ ClassicEditor }
        data="<p>Hello from CKEditor 5!</p>"
        onInit={ editor => {
          return {
            toolbar: [ 'bold', 'italic', 'alignment' ]
          }
          // return {
          //   plugins: [ Bold ],
          //   toolbar: [ 'bold' ]
          // }
            // You can store the "editor" and use when it is needed.
            // console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event, editor ) => {
            const data = editor.getData();
            console.log( { event, editor, data } );
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
      />
    </div>
    {/* <div id="editor">
      <p>This is the initial editor content.</p>
    </div> */}
    {/* <Editor
      toolbar={{
        image: {
          uploadCallback: (file) => {
            console.log('file', file)
            // api.file.upload(false, file)
            return Promise.resolve({ data: { link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1SMprFk_QNRe1QolwHEytbRmcoB_GVe-3li5FcF2iOtHnKqYe&s' } })
          }
        }
      }}
    /> */}
    {/* <Editor
    ref={ref}
    editorState={editorState}
    onChange={onChange} /> */}
  </Basic>
}

// export default withContainer(React.memo(Test), (c, props) => ({
//   api: c.api
// }))
