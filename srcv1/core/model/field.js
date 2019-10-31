import EventHandler from '../eventHandler'
import { combineValidators } from './utils'
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
  _sideEffects
  name
  error
  validated = false
  get value() {
    return this._value || ''
  }
  set value(value) {
    this.setValue(value)
  }

  get isValid() {
    return !this.error
  }

  constructor(model, { validators, sideEffects, ...fieldProps }) {
    super()
    this.initEvents(['validated', 'change'])

    Object.assign(this, fieldProps)
    this._validators = validators
    this._sideEffects = sideEffects
    this._model = model
  }

  /**
   * Set validation status and return validated result
   * @param {*} value
   */
  validate(value) {
    const validated = combineValidators.call(
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
    this.trigger('validated', this.error)
    return !this.error
  }

  /**
   * Set value without validating
   * @param {*} value
   */
  initValue(value) {
    this.error = null
    this.validated = false
    this._value = value
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
  setValue(value, conflictCheck = []) {
    if (conflictCheck.includes(this.name)) return

    if (this.value === value) return
    this.initValue(value)
    this.validate(value)

    conflictCheck.push(this.name)

    if (typeof this._sideEffects === 'function') {
      this._sideEffects(this._model, this, conflictCheck)
    }
    this.trigger('change', this)
  }
}
