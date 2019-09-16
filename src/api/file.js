/* global FormData, $, XMLHttpRequest, fetch */
import config from '../../config'

let domain = config.server.domain

export default class File {
  upload (multiple, files, name, folder = '', callback) {
    if (!files || files.length <= 0) return callback(new Error('No file'))
    var formData = new FormData()
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      // add the files to formData object for the data payload
      formData.append(name, file, file.name)
    }
    fetch(domain + '/upload?folder=' + folder, { // Your POST endpoint
      method: 'POST',
      headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
        // 'Content-Type': 'multipart/form-data'
      },
      body: formData // This is your file object
    }).then(response => {
      return response.json()
    }).then(resp => {
      if (resp.status && resp.status === 200) return callback(null, multiple ? resp.data : resp.data[0])
    }).catch(error => console.log(error))
  }

  upload1 (multiple, files, name, folder = '', callback) {
    if (!files || files.length <= 0) return callback(new Error('No file'))
    var formData = new FormData()
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      // add the files to formData object for the data payload
      formData.append(name, file, file.name)
    }

    $.ajax({
      url: domain + '/upload?folder=' + folder,
      type: 'POST',
      form: formData,
      processData: false,
      contentType: false,
      success: function (resp) {
        if (resp.status && resp.status === 200) return callback(null, multiple ? resp.data : resp.data[0])
        return callback(new Error('Upload file'))
      },
      error: function (data) {
        data.then(e => console.log(e))
      },
      xhr: function () {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest()

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function (evt) {
          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total
            percentComplete = parseInt(percentComplete * 100)

            // update the Bootstrap progress bar with the new percentage
            $('.progress-bar').text(percentComplete + '%')
            $('.progress-bar').width(percentComplete + '%')

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('.progress-bar').html('Done')
            }
          }
        }, false)
        return xhr
      }
    })
  }
}
