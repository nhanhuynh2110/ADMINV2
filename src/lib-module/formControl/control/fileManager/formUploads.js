import React, {useRef} from 'react'
import conf from '../../../../../config'

const domain = conf.server.domain

const FormUploads = (props) => {
  const {folders = [], data, currentPath } = props
  const refFile = useRef(null)
  const st = {
    display: 'flex'
  }

  const image = currentPath ? `${domain}/file-manager/${currentPath}/${data.path}` : `${domain}/file-manager/${data.path}`

  return <>
    <div className='row'>
      <div className='col-md-3 col-sm-3 col-xs-3'>
        <img style={{width: '100%'}} src={image} />
      </div>
      <div className='col-md-9 col-sm-9 col-xs-9'>
        <div style={st}>
          <div className='input-group'>
            <span className='input-group-addon'>@</span>
            <input type='text' className='form-control' placeholder='Enter Size' />
          </div>
          <select className='form-control select2 select2-hidden-accessible' style={{width: '300px'}} data-select2-id='1' tabIndex='-1' aria-hidden='true'>
            {folders.map( (el, k) => {
              return <option key={el.name}>{el.name}</option>
            })}
          </select>
          <button onClick={() => props.cropImage({ path: data.path })} type='button'style={{width: `100px`}} className='btn btn-block btn-success'>Crop</button>
        </div>
      </div>
    </div>
  </>
}

export default FormUploads