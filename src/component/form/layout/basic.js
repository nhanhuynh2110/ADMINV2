import React from 'react'
import {Link} from 'react-router-dom'

export default (props) => {
  const {className, title, cancle, formValid} = props
  return <React.Fragment>
    <section className='content'>
      <div className='row'>
        <div className={className || 'col-md-12'}>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{title || 'Create'}</h3>
            </div>
            <div className='box-body'>
              {props.children}
            </div>
            <div className='box-footer'>
              <div className='pull-left'>
                <Link to={cancle} className='btn btn-danger btn-xs'>Cancle</Link>
              </div>
              <div className='pull-right'>
                <input
                  className='btn btn-success btn-xs'
                  disabled={!formValid}
                  type='submit'
                  value='Save'
                  // defaultValue={textSaveBtn || 'Save'}
                  // onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
}
