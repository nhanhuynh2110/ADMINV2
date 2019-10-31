import { sprintf } from 'sprintf-js'
import ValidationError from './validationError'
import definedValidators from './validators'

export default ({ test, errorMessage }) => {
  const testFn = typeof test === 'function' ? test : definedValidators[test]
  return function (value) {
    if (!testFn(value)) {
      throw new ValidationError(
        sprintf(errorMessage, { ...this }),
        this,
        testFn
      )
    }

    return true
  }
}
