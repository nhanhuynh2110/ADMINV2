
var model = {
  model: function () {
    return {
      // name: {
      //   label: 'Name',
      //   placeholder: 'please input name',
      //   validators: [
      //     { compare: 'required' }
      //   ]
      // },
      title: {
        label: 'Title',
        placeholder: 'please input title',
        validators: [
          { compare: 'required' },
          { compare: 'minlen', compareTo: 6 }
        ]
      },
      active: {
        text: 'active',
        validators: [
          { compare: 'checked' }
        ]
      }
    }
  }
}

module.exports = model
