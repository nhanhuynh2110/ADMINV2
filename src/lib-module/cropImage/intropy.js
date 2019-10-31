/* global fetch, File, Image */
import SmartCrop from 'smartcrop'
import _ from 'lodash'

export default ({url, options, fileName, fileType = 'image/png'}) => {
  var image = new Image()
  image.crossOrigin = 'Anonymous'
  let processed = {}
  const task = new Promise((resolve, reject) => {
    image.onload = () => {
      window.setTimeout(function () {
        var img = image
        if (processed[img.src]) return
        SmartCrop.crop(image, options).then(function (result) {
          let crop = result.topCrop
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          canvas.width = options.width
          canvas.height = options.height

          ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height)
          resolve(canvas)
        })
      }.bind(this), 100)
    }
    image.src = url
  })

  return task.then(canvas => canvas.toDataURL(fileType))
    .then(dataURL => fetch(dataURL)
      .then(res => res.blob())
      .then(blob => {
        if (fileType === 'image/gif') fileName += '.gif'
        else if (fileType === 'image/jpeg') fileName += '.jpeg'
        else if (fileType === 'image/pjpeg') fileName += '.jpg'
        else if (fileType === 'image/x-png') fileName += '.png'
        else if (fileType === 'image/png') fileName += '.png'
        else if (fileType === 'image/svg+xml') fileName += '.svg'
        const newImage = new Image()
        newImage.src = dataURL
        const file = new File([blob], fileName, blob)
        return { dataURL, file, image: newImage }
      })
    )
    .catch(error => error.toString())
}
