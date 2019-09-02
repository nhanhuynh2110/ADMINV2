import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()

  self.api.category.on('update-category', data => {
    return updateRoles(self, data)
  })

  self.api.category.on('delete-category', data => {
    self.data.setCategory((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateRoles = (self, data = {}) => {
  self.data.setRole(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
