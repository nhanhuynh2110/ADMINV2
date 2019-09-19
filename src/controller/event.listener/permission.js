import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.category.on('get-permissions', (data) => {
    self.data.setPermission(data)
  })

  self.api.category.on('update-permission', data => {
    return updatePermissions(self, data)
  })

  self.api.category.on('delete-permission', data => {
    self.data.setPermission((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updatePermissions = (self, data = {}) => {
  self.data.setPermission(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
