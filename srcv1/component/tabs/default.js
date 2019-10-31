export default [
  {
    name: 'all',
    text: 'All',
    key: 'all',
    on: (state) => {
      // let newState = _.clone(state)
      // newState.payload.isDelete = false
      // newState.payload.level = ''
      // return newState
    }
  },
  {
    name: 'trash',
    text: 'Trash',
    key: 'trash',
    on: (state) => {
      // let newState = _.clone(state)
      // newState.payload.isDelete = true
      // newState.payload.level = ''
      // return newState
    }
  }
]
