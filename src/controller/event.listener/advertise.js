import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.advertise.on('get-advertises', (data) => {
    self.data.setAdvertise(data)
  })

  self.api.advertise.on('update-advertise', data => {
    return updateAdvertise(self, data)
  })

  self.api.advertise.on('delete-advertise', data => {
    self.data.setAdvertise((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateAdvertise = (self, data = {}) => {
  self.data.setAdvertise(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
