export default model => {
  const supportedFileTypes = ['image/png', 'image/jpeg']
  const maxFileSizeInKiB = 1024
  return {
    // file: {
    //   label: 'Upload',
    //   type: 'file',
    //   validators: [
    //     {
    //       test: fs => fs && fs.every(f => supportedFileTypes.includes(f.type)),
    //       errorMessage: 'Filetype is not supported'
    //     },
    //     {
    //       test: fs => fs && fs.every(f => f.size <= maxFileSizeInKiB * 1024),
    //       errorMessage: `File size can't exceed ${maxFileSizeInKiB} KiB`
    //     }
    //   ]
    // },
    title: {
      label: 'Title',
      validators: [
        { test: 'required', errorMessage: '%(label)s is required' }
      ]
    },
    parentId: {
      label: 'Parent'
    },
    description: {
      label: 'Description'
    },
    isActive: {
      text: 'Active'
    },
    isHome: {
      text: 'Show HomePage'
    },
    altImage: {
      label: 'Alt Image',
      placeholder: 'please input altImage'
    },
    metaTitle: {
      label: 'Meta Title',
      placeholder: 'please input Meta Title'
    },
    metaDescription: {
      label: 'Meta Description',
      placeholder: 'please input Meta Description'
    }
  }
}
