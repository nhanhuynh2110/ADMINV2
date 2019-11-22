import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  const api = self.api.unitProduct
  api.on('get-unitProducts', (data) => {
    self.data.setunitProduct(data)
  })

  api.on('update-unitProduct', data => {
    return updateunitProduct(self, data)
  })

  api.on('delete-unitProduct', data => {
    self.data.setunitProduct((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateunitProduct = (self, data = {}) => {
  self.data.setunitProduct(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}