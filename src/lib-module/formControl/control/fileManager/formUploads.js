import React, {useRef} from 'react'

const FormUploads = (props) => {
  const {folders = [] } = props
  const refFile = useRef(null)
  const st = {
    display: 'flex'
  }
  return <>
    <div style={st}>
      <div className='input-group'>
        <span className='input-group-addon'>@</span>
        <input type='text' className='form-control' placeholder='Enter Size' />
      </div>
      <select class="form-control select2 select2-hidden-accessible" style={{width: '300px'}} data-select2-id="1" tabindex="-1" aria-hidden="true">
        {folders.map( (el, k) => {
          return <option key={el.name}>{el.name}</option>
        })}
      </select>
      <button type='button'style={{width: `100px`}} className='btn btn-block btn-success' onClick={() => refFile.current.click()}>Uploads</button>
      <input multiple ref={refFile} type='file' className='hidden'/>
    </div>
    
    
    
  </>
}

export default FormUploads