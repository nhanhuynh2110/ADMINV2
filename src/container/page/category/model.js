export default {
  img: {
    name: 'img',
    validators: [
      { compare: 'required' }
    ]
  },
  title: {
    name: 'title',
    label: 'Title',
    validator: [
      { compare: 'require' },
      { compare: 'minlen', compareTo: 2 }
    ]
  },
  parentId: {
    name: 'parentId',
    label: 'Parent'
  },
  description: {
    name: 'description',
    label: 'Description'
  },
  isActive: {
    name: 'isActive',
    text: 'Active'
  },
  isHome: {
    name: 'isHome',
    text: 'Show HomePage'
  },
  altImage: {
    name: 'altImage',
    label: 'Alt Image',
    placeholder: 'please input altImage'
  },
  metaTitle: {
    name: 'metaTitle',
    label: 'Meta Title',
    placeholder: 'please input Meta Title'
  },
  metaDescription: {
    name: 'metaDescription',
    label: 'Meta Description',
    placeholder: 'please input Meta Description'
  }
}
