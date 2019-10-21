export default {
  image: {
    name: 'image'
  },
  gallery: {
    name: 'gallery'
  },
  title: {
    label: 'Title',
    name: 'title',
    placeholder: 'please input title',
    validator: [
      { compare: 'require' }
    ]
  },
  code: {
    label: 'Code',
    name: 'code',
    placeholder: 'please input code product',
    validator: [
      { compare: 'require' }
    ]
  },
  price: {
    label: 'Price',
    name: 'price',
    placeholder: 'please input price',
    validator: [
      { compare: 'require' }
      // { compare: 'stringIsNumber' }
    ]
  },
  priceSale: {
    label: 'Price Sale',
    name: 'priceSale',
    placeholder: 'please input price sale'
  },
  categoryId: {
    name: 'categoryId',
    label: 'Category'
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
    text: 'Active'
  },
  isNewProduct: {
    name: 'isNewProduct',
    text: 'Is New'
  },
  isHot: {
    name: 'isHot',
    text: 'Is Hot'
  },
  inStock: {
    name: 'inStock',
    text: 'In Stock'
  },
  size: {
    name: 'size',
    label: 'Sizes'
  }
}
