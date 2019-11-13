import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.producer.on('get-producers', (data) => {
    self.data.setProducer(data)
  })

  self.api.producer.on('update-producer', data => {
    return updateProducers(self, data)
  })

  self.api.producer.on('delete-producer', data => {
    self.data.setProducer((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateProducers = (self, data = {}) => {
  self.data.setProducer(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
