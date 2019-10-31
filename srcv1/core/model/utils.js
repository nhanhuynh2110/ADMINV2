import _ from 'lodash'
import { sprintf } from 'sprintf-js'
import ValidationError from './validation/validationError'
import definedValidators from './validation/validators'
import FileField from './fileField'
import Field from './field'
import CheckboxField from './checkboxField'

/* Model's field utilities */
const types = {
  file: FileField,
  checkbox: CheckboxField,
  radio: CheckboxField
}

function createField (model, modelField) {
  if (!modelField.name) throw new Error(`Model's name is required`)
  const type = modelField.type
  const XField = types[type] || Field
  return new XField(model, modelField)
}

function defineFieldsAsProperties () {
  Object.defineProperties(
    this,
    _.mapValues(this._fields, field => {
      return {
        enumerable: true,
        configurable: true,
        get() {
          return field
        }
      }
    })
  )
}

function initFields (defaultData) {
  this._fields = _.mapValues(this._model, (modelField, name) => {
    const value = _.get(defaultData, name, undefined)
    const field = createField(this, { ...modelField, name })

    field.on('change', field => {
      this.trigger('change', this, field)
    })

    if (value === undefined) return field

    field.initValue(value)
    return field
  })
  defineFieldsAsProperties.call(this)
}

/* Model's field's validation utilities */

function createValidator ({ test, compareTo, errorMessage }) {
  const testFn = typeof test === 'function' ? test : definedValidators[test]

  if (
    testFn.length >= 2 &&
    typeof test === 'string' &&
    compareTo === undefined
  ) {
    throw new Error('Test function require `compareTo` as compared value')
  }

  const comparedValue =
    testFn.length === 2 && typeof test === 'function' ? this._model : compareTo

  return value => {
    if (!testFn(value, comparedValue)) {
      throw new ValidationError(
        sprintf(errorMessage, { ...this }),
        this,
        testFn
      )
    }
    return true
  }
}

function combineValidators (validators, value) {
  const mappedValidators = validators.map(validator =>
    createValidator.call(this, validator)
  )
  try {
    mappedValidators.forEach(v => v.call(this, value))
    return true
  } catch (e) {
    if (e instanceof ValidationError) return e
    else throw e
  }
}

export { initFields, combineValidators }
