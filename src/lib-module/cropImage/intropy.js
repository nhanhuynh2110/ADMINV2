/* global fetch, File, Image */
import SmartCrop from 'smartcrop'
import _ from 'lodash'

export default ({ image, originWidth, originHeight, fileName, type = 'image/png' }) => {
  let processed = {}
  let img = image
  let w = originWidth
  let h = originHeight

  let options = { width: w, height: h }

  const waitForImageToLoad = function (imageElement) {
    return new Promise(resolve => { imageElement.onload = resolve })
  }

  return waitForImageToLoad(img)
    .then(() => {
      if (processed[img.src]) return
      processed[img.src] = true

      return SmartCrop.crop(img, options)
        .then(result => {
          let crop = result.topCrop
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          canvas.width = options.width
          canvas.height = options.height

          ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height)
          return canvas
        })
    })
    .then(canvas => canvas.toDataURL('image/png'))
    .then(dataURL => fetch(dataURL)
      .then(res => res.blob())
      .then(blob => {
        const newImage = new Image()
        newImage.src = dataURL
        const file = new File([blob], fileName, blob)
        return { dataURL, file, image: newImage }
      })
    )
    .catch(error => error.toString())
}
