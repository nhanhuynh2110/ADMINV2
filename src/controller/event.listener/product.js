import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  const api = self.api.product
  api.on('get-products', (data) => {
    self.data.setProduct(data)
  })

  api.on('update-product', data => {
    return updateProducts(self, data)
  })

  api.on('delete-product', data => {
    self.data.setProduct((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateProducts = (self, data = {}) => {
  self.data.setCategory(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
