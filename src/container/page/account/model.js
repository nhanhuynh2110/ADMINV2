
var model = {
  model: function () {
    return {
      avatar: {
        validators: [
          { compare: 'required' }
        ]
      },
      email: {
        label: 'Email',
        placeholder: 'email',
        validators: [
          { compare: 'email' }
        ]
      },
      username: {
        label: 'User Name',
        placeholder: 'username',
        validators: [
          { compare: 'required' },
          { compare: 'minlen', compareTo: 6 }
        ]
      },
      firstname: {
        label: 'First Name',
        placeholder: 'firstname',
        validators: [
          { compare: 'required' }
        ]
      },
      lastname: {
        label: 'Last Name',
        placeholder: 'lastname',
        validators: [
          { compare: 'required' }
        ]
      },
      address: {
        label: 'Address',
        placeholder: 'address',
        validators: []
      },
      phone: {
        label: 'Phone',
        placeholder: 'phone',
        validators: [
          { compare: 'stringIsNumber' }
        ]
      },
      birthday: {
        label: 'Birthday'
      }
    }
  }
}

module.exports = model
