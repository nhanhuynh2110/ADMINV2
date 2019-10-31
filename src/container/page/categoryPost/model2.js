
var model = {
  model: function () {
    return {
      img: {
        validators: [
          { compare: 'required' }
        ]
      },
      title: {
        label: 'Title',
        placeholder: 'please input title',
        validators: [
          { compare: 'required' }
        ]
      },
      description: {
        label: 'Description',
        validators: []
      },
      parentId: {
        label: 'Parent'
      },
      altImage: {
        label: 'Alt Image',
        placeholder: 'please input altImage',
      },
      metaTitle: {
        label: 'Meta Title',
        placeholder: 'please input Meta Title',
      },
      metaDescription: {
        label: 'Meta Description',
        placeholder: 'please input Meta Description',
      },
      isActive: {
        text: 'Active'
      },
      isHome: {
        text: 'Show HomePage'
      }
    }
  }
}

module.exports = model
