import React, { createContext, useState } from 'react'

const Context = createContext()

export { Context }

const getFilterFunction = filter =>
  typeof filter === 'function'
    ? filter
    : item => Object.keys(filter).every(k => item.k !== undefined && filter[k] === item.k)

export default (props) => {
  const { data, children } = props
  const [, forceUpdate] = useState()

  const put = (name, value) => {
    data[name] = value
    forceUpdate({ ...data })
  }

  const dataSetter = {
    put,
    add: (name, value) => {
      const d = data[name]

      if (!Array.isArray(d)) {
        put(name, value)
      } else {
        d.push(value)

        put(name, d)
      }
    },
    remove: (name, filter, forced = false) => {
      if (!filter && !forced) {
        throw new Error(
          'Filter is required for remove data. Unless you pass force = true'
        )
      }

      let d = data[name]
      if (!Array.isArray(d) || forced) {
        delete d[name]

        put(name, d)
      } else {
        const filterFn = getFilterFunction(filter)
        d = d.filter(filterFn)

        put(name, d)
      }
    },
    update: (name, filter, value) => {
      if (!filter) throw new Error('Filter is required for update data')

      let d = data[name]

      if (!Array.isArray(d) || typeof value !== 'object') {
        put(name, value)
      } else {
        const filterFn = getFilterFunction(filter)
        d = d.filter(filterFn)
        d.map(item => ({ ...item, ...value }))

        put(name, d)
      }
    }
  }
  return (
    <Context.Provider value={{ data, dataSetter }}>{children}</Context.Provider>
  )
}
