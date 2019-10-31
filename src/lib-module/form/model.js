import Field from './field'
import EventHandler from './eventHandler'

class Model extends EventHandler {
  get data () {
    return _.mapValues(this._fields, f => f.value)
  }
  set data (value) {
    this.setData(value)
  }

  get isValid () {
    return Object.keys(this._fields).every(
      name => this._fields[name].validated && this._fields[name].isValid
    )
  }

  get fields () {
    return this._fields
  }

  get errors () {
    if (
      !Object.keys(this._fields).every(name => this._fields[name].validated)
    ) {
      this.validate()
    }

    const errors = _.mapValues(
      _.pickBy(this._fields, field => !!field.error),
      field => field.error
    )
    return Object.keys(errors).length ? errors : null
  }

  constructor (model, defaultData) {
    super(['change'])
    this._model = model()
    this._initFields(defaultData)
    this._defineFieldsAsProperties()
    if (!this._fields) throw new Error('Model is empty')
  }

  _initFields (defaultData) {
    this._fields = _.mapValues(this._model, (modelField, name) => {
      const value = _.get(defaultData, name, undefined)
      const field = new Field(name, modelField)
      field.on('change', field => {
        this.trigger('change', this, field)
      })

      if (value === undefined) return field

      field.initValue(value)
      return field
    })
  }

  _defineFieldsAsProperties () {
    Object.defineProperties(
      this,
      _.mapValues(this._fields, field => {
        return {
          enumerable: true,
          configurable: true,
          get () {
            return field
          }
        }
      })
    )
  }

  extractFromEvent (e) {
    const {
      target: { name, value }
    } = e
    this.setData({ [name]: value })
  }

  setData (data) {
    if (!data || typeof data !== 'object') return
    let changed = false
    Object.keys(data).forEach(name => {
      const value = data[name]
      const field = this._fields[name]
      if (value === undefined || !field || field.value === value) return

      this._fields[name].setValue(value)
      changed = true
    })
    if (changed) this.trigger('change', this)
  }

  validate () {
    _.mapValues(this._fields, f => f.validate())
    return this.isValid
  }
}

export default Model
