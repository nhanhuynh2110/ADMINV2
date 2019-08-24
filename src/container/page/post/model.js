
var model = {
    model: function () {
      return {
        title: {
          label: 'Title',
          placeholder: 'please input title',
          validators: [
            { compare: 'required' },
            { compare: 'minlen', compareTo: 6 }
          ]
        },
        introTitle: {
          label: 'Intro Title',
          placeholder: 'please input intro title',
          validators: [
            { compare: 'required' }
          ]
        },
        categoryPostId: {
            label: 'Category post',
            validators: []
          },
        description: {
          label: 'Description',
          validators: []
        },
        isActive: {
          text: 'Active'
        }
      }
    }
  }
  
  module.exports = model
  