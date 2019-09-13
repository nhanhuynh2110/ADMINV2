
var model = {
  model: function () {
    return {
      image: {
        validators: []
      },
      imageGallery: {
        validators: []
      },
      title: {
        label: 'Title',
        placeholder: 'please input title',
        validators: [
          { compare: 'required' }
        ]
      },
      code: {
        label: 'Code',
        placeholder: 'please input code product',
        validators: [
          { compare: 'required' }
        ]
      },
      price: {
        label: 'Price',
        placeholder: 'please input price',
        validators: [
          { compare: 'required' },
          { compare: 'stringIsNumber' }
        ]
      },
      priceSale: {
        label: 'Price Sale',
        placeholder: 'please input price sale',
        validators: [
          { compare: 'required' },
          { compare: 'stringIsNumber' }
        ]
      },
      description: {
        label: 'Description',
        validators: []
      },
      isActive: {
        text: 'Active'
      },
      isNewProduct: {
        text: 'Is New'
      },
      isHot: {
        text: 'Is Hot'
      }
    }
  }
}

module.exports = model
