export default {
  image: {
    name: 'image',
    validator: [
      { compare: 'require' }
    ]
  },
  title: {
    name: 'title',
    label: 'Title',
    placeholder: 'please input title',
    validator: [
      { compare: 'require' }
    ]
  },
  introTitle: {
    name: 'introTitle',
    label: 'Intro Title',
    placeholder: 'please input intro title',
    validator: [
      { compare: 'require' }
    ]
  },
  categoryPostId: {
    name: 'categoryPostId',
    label: 'Category post'
  },
  description: {
    name: 'description',
    label: 'Description'
  },
  content: {
    name: 'content',
    label: 'Content'
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
  },
  isActive: {
    name: 'isActive',
    text: 'Active',
    label: ' '
  },
}
