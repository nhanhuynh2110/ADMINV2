import Actions from '../actions'
export default [
  {
    name: 'all',
    text: 'All',
    key: 'all',
    actions: Actions,
    on: (filter) => {
      let newFilter = _.clone(filter)
      newFilter.isDelete = false
      newFilter.level = ''
      return newFilter
    }
  },
  {
    name: 'parent',
    text: 'Parent',
    key: 'parent',
    actions: Actions,
    on: (filter) => {
      let newFilter = _.clone(filter)
      newFilter.isDelete = false
      newFilter.level = 'parent'
      return newFilter
    }
  },
  {
    name: 'children',
    text: 'Children',
    key: 'children',
    actions: Actions,
    on: (filter) => {
      let newFilter = _.clone(filter)
      newFilter.isDelete = false
      newFilter.level = 'children'
      return newFilter
    }
  },
  {
    name: 'trash',
    text: 'Trash',
    key: 'trash',
    actions: Actions.Trash,
    on: (filter) => {
      let newFilter = _.clone(filter)
      newFilter.isDelete = true
      newFilter.level = ''
      return newFilter
    }
  }
]
