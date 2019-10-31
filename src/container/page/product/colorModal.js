import React from 'react'

export default (props) => {
  const ref = React.useRef(null)
  const [color, setColor] = React.useState(null)
  const [error, setError] = React.useState(false)

  const {selectSize} = props

  const onSubmit = () => {
    if (typeof props.onSubmit !== 'function') return
    if (!color) return setError(true)
    props.onSubmit({value: color, name: props.name, selectSize: selectSize})
    setError(false)
    setColor(null)
    document.getElementById('select-color-picker').style.backgroundColor = '#fff'
    document.getElementById('btn-color-close').click()
  }

  React.useEffect(() => {
    $(`#color-szie-id`).colorpicker().on('changeColor', (e) => {
      setColor(e.color.toHex())
    })
  }, [selectSize])

  return <>
    <button type='button'  data-target='#modal-color-form' data-toggle='modal' className='btn bg-orange margin'><i className='fa fa-plus' /></button>
    <div className='modal modal-color-form' id='modal-color-form'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>×</span></button>
            <h4 className='modal-title'>Add Color To Size</h4>
          </div>
          <div className='modal-body'>
            {error && <p>Please choose color for size</p>}
            <div id='color-szie-id' className='input-group my-colorpicker2 colorpicker-element'>
              <div className='input-group-addon'>
                <i id='select-color-picker' className='w-100' />
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' id='btn-color-close' className='btn btn-default pull-left' data-dismiss='modal'>Close</button>
            <button type='button' className='btn btn-primary' onClick={onSubmit}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </>
}