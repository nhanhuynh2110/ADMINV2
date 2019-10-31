import ValidationError from 'lib-module/formControl/ValidationError'

export default {
  password: {
    name: 'password',
    label: 'Password old',
    className: 'form-group has-feedback',
    validator: [
      { compare: 'require' },
      { compare: 'minlen', compareTo: 8 },
      { compare: 'maxlen', compareTo: 16 }
    ]
  },
  newPassword: {
    name: 'newPassword',
    label: 'New password',
    className: 'form-group has-feedback',
    validator: [
      { compare: 'require' },
      { compare: 'minlen', compareTo: 8 },
      { compare: 'maxlen', compareTo: 16 }
    ]
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Corfirm password',
    className: 'form-group has-feedback',
    validator: [
      { compare: 'require' },
      { compare: (value, model) => {
        if (value === model.newPassword.value) return true
        throw new ValidationError('confirm is not match!!')
      }}
    ]
  }
}
