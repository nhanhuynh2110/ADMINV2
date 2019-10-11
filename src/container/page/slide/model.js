
var model = {
  model: function () {
    return {
      image: {
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
      subTitle: {
        label: 'Sub Title',
        placeholder: 'please input sub title'
      },
      link: {
        label: 'Link',
        placeholder: 'please input link',
      },
      description: {
        label: 'Description',
        validators: []
      },
      altImage : {
        label: 'Alt Image',
        placeholder: 'please input altImage',
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
