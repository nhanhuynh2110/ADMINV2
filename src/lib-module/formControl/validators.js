import ValidationError from './validationError'

export default {
  require: function (value) {
    if (!(_.isNil(value) || value.toString().trim().length === 0)) return true
    throw new ValidationError('This field is required')
  },
  minlen: function (value, compareTo) {
    if (value && value.trim().length < compareTo) {
      throw new ValidationError('The text entered exceeds the minimun length')
    }
    return true
  },
  maxlen: function (value, compareTo) {
    if (value && value.trim().length > compareTo) {
      throw new ValidationError('The text entered exceeds the maximum length')
    }
    return true
  }
}