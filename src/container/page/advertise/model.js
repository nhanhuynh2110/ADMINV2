
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
      altImage : {
        label: 'Alt Image',
        placeholder: 'please input altImage',
      },
      metaTitle : {
        label: 'Meta Title',
        placeholder: 'please input Meta Title',
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
