import React from 'react'

class Select extends React.PureComponent {
  render () {
    let {isSelected, classSelect, onChange, options} = this.props
    let opts = options || []
    return (
      <select className={'form-control ' + classSelect} style={{ width: '100%' }} onChange={onChange} defaultValue={isSelected}>
        <option value={null}>--choose--</option>
        {opts.map((el, index) => {
          if (el.value === isSelected) return <option selected value={el.value} key={index}>{el.text}</option>
          else return <option value={el.value} key={index}>{el.text}</option>
        })}
      </select>
    )
  }
}

export default Select
