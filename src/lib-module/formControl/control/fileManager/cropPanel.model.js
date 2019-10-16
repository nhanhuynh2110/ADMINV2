export default {
  size: {
    name: 'size',
    label: 'Size',
    className: 'form-group',
    validator: [
      { compare: 'require' }
    ]
  },
  fileName: {
    name: 'fileName',
    label: 'File Name',
    className: 'form-group',
    validator: [
      { compare: 'require' }
    ]
  },
  fileType: {
    name: 'fileType',
    label: 'File Type',
    className: 'form-group'
  },
  selectFolder: {
    name: 'selectFolder',
    label: 'Choose Folder',
    className: 'form-group'
  }
}
