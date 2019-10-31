import _ from 'lodash'

export default class DataRow {
  get data() {
    return this._data
  }
  constructor(model, item) {
    this._model = model
    this._data = item
    Object.defineProperties(
      this,
      _.mapValues(model, ({ formatter }, p) => {
        return {
          enumerable: true,
          get () {
            return typeof formatter === 'function'
              ? formatter(item[p], this._locale)
              : item[p]
          }
        }
      })
    )
  }

  setLocale(locale) {
    this._locale = locale
  }

  mapColumn(iterator) {
    return Object.keys(this._model)
      .filter(p => !this._model[p].hidden)
      .map((name, index) => iterator(this[name], name, index))
  }
}
