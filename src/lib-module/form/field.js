import validation from './validation'
import EventHandler from './eventHandler'

function fieldValidate(validators, value) {
  const mappedValidators = validators.map(validator => validation(validator))
  try {
    mappedValidators.forEach(v => v.call(this, value))
    return true
  } catch (e) {
    return e
  }
}

/**
 * Model's field
 * @property {function[]} _validators List of validation functions
 * @property {ValidationError} error Error throw after recent failed validation. Null if no error
 * @property {bool} validated Whether the field is validated or not, result can be error or success
 * @property {string} name Field name
 * @property {mixed} value Field value, depends on implementation of field input component
 */
export default class Field extends EventHandler {
  _validators
  _value
  error
  validated = false
  name

  get value() {
    return this._value;
  }
  set value(value) {
    this.setValue(value);
  }

  get isValid() {
    return !this.error
  }

  constructor(name, { validators, ...fieldProps }) {
    super(['change'])

    Object.assign(this, fieldProps)
    this._validators = validators
    this.name = name
  }

  /**
   * Set validation status and return validated result
   * @param {*} value
   */
  validate(value) {
    const validated = fieldValidate.call(
      this,
      this._validators,
      value !== undefined ? value : this.value
    )
    this.validated = true
    if (validated === true) {
      this.error = null
    } else {
      this.error = validated
    }
    return !this.error
  }

  /**
   * Set value without validating
   * @param {*} value
   */
  initValue(value) {
    this.error = null;
    this.validated = false;
    this._value = value;
  }

  extractFromEvent(e) {
    const {
      target: { value }
    } = e
    this.setValue(value)
  }

  /**
   * Set value after validate, trigger onChange event after field set
   * @param {*} value
   */
  setValue(value) {
    if (this.value === value) return;
    this.initValue(value)
    this.validate(value)
    this.trigger('change', this)
  }
}
