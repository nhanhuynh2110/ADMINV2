import React from 'react'

export default (props) => {
  const ref = React.useRef(null)
  const {defaultValue, isEdit, selectSize} = props

  const onSubmit = () => {
    if (typeof props.onSubmit !== 'function') return
    props.onSubmit({value: ref.current.value, name: ref.current.name})
    ref.current.value = ''
    document.getElementById('btn-size-close').click()
  }

  React.useEffect(() => {
    if (isEdit) {
      ref.current.value = selectSize.name
      ref.current.focus()
    } else {
      ref.current.value = ''
      ref.current.focus()
    }
    ref.current.focus()
  }, [defaultValue, isEdit])

  return <React.Fragment>
    <div className='modal' id='modal-size-form'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>
            <h4 className='modal-title'>Add Size</h4>
          </div>
          <div className='modal-body'>
            <input ref={ref} defaultValue={defaultValue} name={props.name} className='w-100 border-none form-control input-lg' type='text' placeholder='Please Enter Size Name' />
          </div>
          <div className='modal-footer'>
            <button type='button' id='btn-size-close' className='btn btn-default pull-left' data-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-primary' onClick={onSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
}
