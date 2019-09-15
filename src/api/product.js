import Adapter from './adapter'
import Config from './adapter/config'
import handleError from './error'
import Base from './base'

export default class Product extends Base {
  constructor () {
    super()
    var conf = new Config()
    this.adapter = new Adapter(conf.get())
  }

  getAll (payload, cb) {
    payload['api'] = '/api/admin/products/'
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  gets (payload, cb) {
    payload['api'] = '/api/admin/product'
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('get-products', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  get (payload, cb) {
    payload['api'] = '/api/admin/product/' + payload.id
    delete payload.id
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('get-product', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  insert (payload, cb) {
    payload['api'] = '/api/admin/product'
    this.adapter.post('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('insert-product', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  update (payload, cb) {
    payload['api'] = '/api/admin/product/' + payload.id
    console.log('payload', payload)
    this.adapter.put('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('update-product', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  delete (payload, cb) {
    payload['api'] = '/api/admin/product/' + payload.id
    this.adapter.delete('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200 || !resp.data) return cb(resp.message)
      this.emit('delete-product', payload.id)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }
}
