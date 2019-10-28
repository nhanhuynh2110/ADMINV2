import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  const api = self.api.product
  api.on('get-products-master', (data) => {
    self.data.setProductMaster(data)
  })

  api.on('update-product-master', data => {
    return updateProductsMaster(self, data)
  })

  api.on('delete-product-master', data => {
    self.data.setProductMaster((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateProductsMaster = (self, data = {}) => {
  self.data.setProductMaster(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
