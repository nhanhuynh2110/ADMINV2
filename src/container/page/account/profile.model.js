
var model = {
  model: function () {
    return {
      avatar: {
        validators: []
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
      },
      gender: {
        label: 'Gender',
        options: [{ text: 'Nam', value: 1 }, { text: 'Nữ', value: 2 }]
      }
    }
  }
}

module.exports = model
