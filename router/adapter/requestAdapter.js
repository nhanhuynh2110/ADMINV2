/* global fetch */
const request = require('request')
const _ = require('lodash')

require('es6-promise').polyfill()
require('isomorphic-fetch')

class RequestAdapter {
  constructor (options) {
    this.options = options
  }

  addHeaders (field, value) {
    this.options['headers'][field] = value
  }

  setOptions (options) {
    this.options = options
  }

  async get (url, options, cb) {
    fetch(url, options).then(response => response.json()).then(data => cb(null, data)).catch(cb)
  }

  post (cb) {
    request(this.options, (error, response, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }

  put (cb) {
    const url = this.options.url
    const options = _.clone(this.options)
    delete options.url
    options['body'] = JSON.stringify(this.options.form)
    fetch(url, options).then(response => response.json()).then(data => {
      return cb(null, data)
    }).catch(error => {
      return cb(error)
    })
  }

  delete (cb) {
    const url = this.options.url
    const options = _.clone(this.options)
    delete options.url
    options['body'] = JSON.stringify(this.options.form)
    fetch(url, options).then(response => response.json()).then(data => {
      return cb(null, data)
    }).catch(error => {
      return cb(error)
    })
  }
}

module.exports = RequestAdapter
