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
    email: {
      label: 'Email',
      validators: [
        { test: 'required', errorMessage: '%(label)s is required' },
        {
          test: 'email',
          errorMessage: '%(label)s is not valid email'
        }
      ]
    },
    password: {
      label: 'Password',
      sideEffects: (model, self) => {
        model.retypePassword.validate()
      },
      validators: [
        { test: 'required', errorMessage: '%(label)s is required' },
        {
          test: 'minlen',
          compareTo: 8,
          errorMessage: '%(label)s must be longer than 8 characters'
        },
        {
          test: 'strongPassword',
          errorMessage: '%(label)s is not strong enough'
        }
      ]
    },
    retypePassword: {
      label: 'Retype Password',
      validators: [
        {
          test: (v, model) => v === model.password.value,
          errorMessage: '%(label)s must be match with password.'
        }
      ]
    }
  }
}
