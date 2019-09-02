import React from 'react'

class Select extends React.PureComponent {
  render () {
    
    let {isSelected, classSelect, onChange, options} = this.props
    console.log('options', options)
    let opts = options || []
    return (
      <select className={'form-control ' + classSelect} style={{ width: '100%' }} onChange={onChange} defaultValue={isSelected}>
        <option>--choose--</option>
        {opts.map((el, index) => <option value={el.value} key={index}>{el.text}</option>)}
      </select>
    )
  }
}

export default Select
