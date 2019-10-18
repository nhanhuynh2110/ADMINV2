import conf from '../../../../../config'

const domain = conf.server.domain

const delay = (callback, ms) => {
  var timer = 0
  return () => {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      callback.apply(context, args)
    }, ms || 0)
  }
}

export default (selector, onChange, cb) => {
  return {
    mode: 'specific_textareas',
    selector: selector,
    height: 500,
    theme: 'modern',
    images_upload_url: domain + '/upload',
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help image code',
    toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | undo redo | image code',
    image_advtab: true,
    templates: [{
      title: 'Test template 1',
      content: 'Test 1'
    },
    {
      title: 'Test template 2',
      content: 'Test 2'
    }
    ],
    content_css: [
      '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      '//www.tinymce.com/css/codepen.min.css'
    ],
    setup: function (ed) {
      ed.on('KeyUp', delay(function (e) {
        return onChange()
        // return onChange(null, {name, value: tinymce.activeEditor.getContent().replace(/&/g, 'vanhan')})
      }, 500))
    },
    init_instance_callback: cb,

    images_upload_handler: function (blobInfo, success, failure) {
      var xhr, formData
      xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', domain + '/upload')
      xhr.onload = function () {
        var json
        if (xhr.status !== 200) {
          failure('HTTP Error: ' + xhr.status)
          return
        }
        json = JSON.parse(xhr.responseText)
        if (!json || !json.data || typeof json.data[0].link !== 'string') {
          failure('Invalid JSON: ' + xhr.responseText)
          return
        }
        success(json.data[0].link)
      }
      formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      xhr.send(formData)
    }
  }
}
