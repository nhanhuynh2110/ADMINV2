  
export default {
  title: {
    name: 'title',
    label: 'Title',
    validator: [
      { compare: 'require'},
      { compare: 'minlen', compareTo: 2 }
    ]
  },
  title1: {
    name: 'title1',
    label: 'Title1'
  },
  sl: {
    name: 'sl',
    label: 'Select Field',
    options: [
      { key: 'opt', value: '', test: 'choose' },
      { key: 'opt1', value: 'option1', test: 'option1' },
      { key: 'opt2', value: 'option2', test: 'option2' }
    ]
  }
}