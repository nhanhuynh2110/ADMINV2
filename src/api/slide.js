import Adapter from './adapter'
import Config from './adapter/config'
import handleError from './error'
import Base from './base'

export default class Slide extends Base {
  constructor () {
    super()
    var conf = new Config()
    this.adapter = new Adapter(conf.get())
    this.prefix = '/api/admin/slide/'
  }

  getAll (payload, cb) {
    payload['api'] = '/api/admin/slides/'
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  gets (payload, cb) {
    payload['api'] = this.prefix
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('get-slides', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  get (payload, cb) {
    payload['api'] = this.prefix + payload.id
    delete payload.id
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('get-slide', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  insert (payload, cb) {
    payload['api'] = this.prefix
    this.adapter.post('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('insert-slide', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  update (payload, cb) {
    payload['api'] = this.prefix + payload.id
    this.adapter.put('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('update-slide', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  delete (payload, cb) {
    payload['api'] = this.prefix + payload.id
    this.adapter.delete('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200 || !resp.data) return cb(resp.message)
      this.emit('delete-slide', payload.id)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }
}
