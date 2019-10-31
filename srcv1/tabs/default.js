export default [
  {
    name: 'parent',
    text: 'Parent',
    key: 'parent',
    on: (state) => {
      // let newState = _.clone(state)
      // newState.payload.isDelete = false
      // newState.payload.level = 'parent'
      // return newState
    }
  },
  {
    name: 'children',
    text: 'Children',
    key: 'children',
    on: (state) => {
      // let newState = _.clone(state)
      // newState.payload.isDelete = false
      // newState.payload.level = 'children'
      // return newState
    }
  },
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
