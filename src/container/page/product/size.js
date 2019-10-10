import React from 'react'
import { SketchPicker } from 'react-color'

import { withFormBehaviors } from '../../../component/form/form'
import Field from '../../../component/form/field'
import Model from './size.model'

class Size extends React.PureComponent {
  render () {
    const { onInputChange, model } = this.props
    const { size, color } = model

    return (
      <React.Fragment>
        <div className='nav-tabs-custom product-size'>
          <ul className='nav nav-tabs'>
            <li className='active'><a href='#tab_1' data-toggle='tab' aria-expanded='true'>Tab 1</a></li>
            <li className=''><a href='#tab_2' data-toggle='tab' aria-expanded='false'>Tab 2</a></li>
            <li><a href='#tab_3' data-toggle='tab'>Tab 3</a></li>
            <li className='dropdown'>
              <button data-target='#modal-default' data-toggle='modal' type='button' className='btn btn-primary'>Add Style</button>
            </li>
            <li className='pull-right'><a className='text-muted'><i className='fa fa-gear' /></a></li>
          </ul>
          <div className='tab-content'>
            <div className='tab-pane active' id='tab_1'>
              <b>How to use:</b>
              <p>Exactly like the original bootstrap tabs except you should use
                the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
              A wonderful serenity has taken possession of my entire soul,
              like these sweet mornings of spring which I enjoy with my whole heart.
              I am alone, and feel the charm of existence in this spot,
              which was created for the bliss of souls like mine. I am so happy,
              my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
              that I neglect my talents. I should be incapable of drawing a single stroke
              at the present moment; and yet I feel that I never was a greater artist than now.
            </div>
            <div className='tab-pane' id='tab_2'>
              The European languages are members of the same family. Their separate existence is a myth.
              For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ
              in their grammar, their pronunciation and their most common words. Everyone realizes why a
              new common language would be desirable: one could refuse to pay expensive translators. To
              achieve this, it would be necessary to have uniform grammar, pronunciation and more common
              words. If several languages coalesce, the grammar of the resulting language is more simple
              and regular than that of the individual languages.
            </div>
            <div className='tab-pane' id='tab_3'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              It has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </div>
        </div>

        <div className='modal' id='modal-default'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span></button>
                <h4 className='modal-title'>Default Modal</h4>
              </div>
              <div className='modal-body'>
                <Field field={size}>
                  <input type='text' className='form-control' placeholder={size.placeholder} onChange={onInputChange} defaultValue={size.value} />
                </Field>

                <Field field={color}>
                  <div>
                    <SketchPicker width={'100%'} onChangeComplete={this.handleChangeColorComplete} />
                    <div>
                      <button type='button' className='btn btn-primary'>Add Color</button>
                      <span><a className='product-color' /><i class='fa fa-remove' /></span>
                      <span><a className='product-color' /><i class='fa fa-remove' /></span>
                      <span><a className='product-color' /><i class='fa fa-remove' /></span>
                    </div>
                  </div>
                </Field>

              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default pull-left' data-dismiss='modal'>Close</button>
                <button type='button' className='btn btn-primary'>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const FormBox = withFormBehaviors(Size, Model)

export default FormBox
