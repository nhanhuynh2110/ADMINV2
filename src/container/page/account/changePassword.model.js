import _ from 'lodash'

const model1 = {
  model: function () {
    return {
      password: {
        placeholder: 'Password',
        validators: [
          { compare: 'required' }
        ]
      },
      newPassword: {
        placeholder: 'New password',
        validators: [
          { compare: 'required' }
        ]
      },
      confirmNewPassword: {
        placeholder: 'Retype new password',
        validators: [
          { compare: 'required' },
          {
            compare: (value, cb) => {
              const {password} = this.state.model
              const pass = _.get(password, 'value')
              const isSuccess = pass === value
              return cb(null, isSuccess)
            },
            message: 'Retype password cannot be match'
          }
        ]
      }
    }
  }
}

export default model1
