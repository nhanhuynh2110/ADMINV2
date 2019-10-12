import _ from 'lodash'

export default (getCtr) => {
  let self = getCtr()
  self.api.slide.on('get-slides', (data) => {
    self.data.setSlide(data)
  })

  self.api.slide.on('update-slide', data => {
    return updateSlide(self, data)
  })

  self.api.slide.on('delete-slide', data => {
    self.data.setSlide((obj) => {
      _.remove(obj.list, {
        code: data
      })
      return obj
    })
  })
}

let updateSlide = (self, data = {}) => {
  self.data.setSlide(obj => {
    if (!obj) return null
    let index = _.findIndex(obj.list, (item) => item._id === data._id)
    if (index >= 0) {
      obj.list[index] = data
    }
    return obj
  })
}
