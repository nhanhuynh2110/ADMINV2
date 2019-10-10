
var model = {
  model: function () {
    return {
      size: {
        label: 'Size',
        validators: ['require']
      },
      color: {
        label: 'Add color',
        validators: ['require']
      }
    }
  }
}

module.exports = model
