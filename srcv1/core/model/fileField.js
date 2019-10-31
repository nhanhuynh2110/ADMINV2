import _ from 'lodash'
import Field from './field'

export default class FileField extends Field {
  _files = []
  setValue(files) {
    let fileProps = [...files].map(file =>
      _.pick(file, ['name', 'size', 'lastModified', 'type'])
    )
    this.validate(fileProps)

    if (this.isValid) {
      if (files && files.length > 0) {
        fileProps = fileProps.map((f, i) => {
          f.url = URL.createObjectURL(files[i])
          return f
        })
      }
      this._files = files
    }
    this._value = this.multiple ? fileProps : fileProps[0]

    this.trigger('change', this)
  }
}
