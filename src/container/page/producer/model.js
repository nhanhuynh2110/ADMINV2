export default {
  img: {
    name: 'img',
    validator: [
      { compare: 'require' }
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
  }
}
