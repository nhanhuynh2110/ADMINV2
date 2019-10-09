
var model = {
  model: function () {
    return {
      image: {
        validators: []
      },
      gallery: {
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
        placeholder: 'please input price sale'
      },
      categoryId: {
        label: 'Category',
        validators: []
      },
      description: {
        label: 'Description',
        validators: []
      },
      content: {
        label: 'Content',
        validators: []
      },
      altImage : {
        label: 'Alt Image',
        placeholder: 'please input altImage',
      },
      metaTitle : {
        label: 'Meta Title',
        placeholder: 'please input Meta Title',
      },
      metaDescription : {
        label: 'Meta Description',
        placeholder: 'please input Meta Description',
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
