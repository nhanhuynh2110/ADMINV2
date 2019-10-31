import _ from 'lodash'
import DataRow from './dataRow'

const buildColumns = model => _.mapValues(model, col => col.label)
const getLocale = () =>
  window.navigator.userLanguage || window.navigator.language

export default class DataTable {
  _locale = getLocale()
  get rows() {
    return this._filter ? this._rows.filter(this._filter) : this._rows
  }

  get length() {
    return this._rows.length
  }

  constructor(model, data) {
    this._model = model
    this._rows = data.map(item => {
      const row = new DataRow(model, item)
      row.setLocale(this._locale)
      return row
    })
    this.header = buildColumns(model)
  }

  mapHeader(iterator) {
    return Object.keys(this.header)
      .filter(p => !this._model[p].hidden)
      .map((name, index) => iterator(this.header[name], name, index))
  }

  mapRows(iterator, options) {
    // filter, sort
    return this.rows.map((r, index) => iterator(r, r.id, index))
  }

  setLocale(locale) {
    this._locale = locale
    this._rows.map(r => {
      r.setLocale(locale)
      return r
    })
  }
  setFilter(filter) {
    this._filter = filter
  }
}

/**
 * table = new DataTable(model, data)
 * <Table>
 *  <TableHeader>{table.header.wrap('th')}</TableHeader>
 *  <TableBody>
 *    {table.rows.wrap('tr').map(row => row.map(col => <Table.Cell>{col.value}</Table.Cell>))}
 *  </TableBody>
 * </Table>
 *
 */
