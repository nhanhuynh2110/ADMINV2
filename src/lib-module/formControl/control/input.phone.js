import React from 'react'
import InputMask from 'react-input-mask'

import Field from '../field/field'

export default (props) => {
  const {field, icon} = props
  const componentprops = _.pick(props, ['className', 'id', 'defaultValue', 'name', 'disabled', 'readOnly'])

  return (
    <Field field={field}>
      {
        icon ? <div className='input-group'>
          <div className='input-group-addon'>
            <i className='fa fa-phone' />
          </div>
          <InputMask
            mask='+84 (999) 999-9999'
            {...componentprops}
          />
        </div>
          : <InputMask
            mask='+84 (999) 999-9999'
            {...componentprops}
          />
      }

    </Field>
  )
}
