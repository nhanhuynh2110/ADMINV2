export default () => {
  return {
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
      validators: [
        { test: 'required', errorMessage: '%(label)s is required' },
        {
          test: v =>
            /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
              v
            ),
          errorMessage: '%(label)s is not strong enough'
        }
      ]
    }
  }
}
