import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  const api = self.api.contact
  api.on('get-contacts', (data) => {
    self.data.setContact(data)
  })

  api.on('update-contact', data => {
    return updateContact(self, data)
  })

  api.on('delete-contact', data => {
    self.data.setContact((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateContact = (self, data = {}) => {
  self.data.setContact(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}