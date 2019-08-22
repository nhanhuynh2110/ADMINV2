import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.category.on('get-categories', (data) => {
    self.data.setCategory(data)
  })

  self.api.category.on('update-category', data => {
    return updateCategories(self, data)
  })

  self.api.category.on('delete-category', data => {
    self.data.setCategory((obj) => {
      _.remove(obj.list, {
        code: data
      })
      console.log('items', obj)
      return obj
    })
  })
}

let updateCategories = (self, data = {}) => {
  console.log('data', data)
  self.data.setCategory(obj => {
    console.log('obj', obj)
    let index = _.findIndex(obj.list, (item) => item.code === data.code)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
