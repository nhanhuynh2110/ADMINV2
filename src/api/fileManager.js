import Adapter from './adapter'
import Config from './adapter/config'
import handleError from './error'
import Base from './base'

const prefix = '/api/admin/file-manager'

export default class FileManager extends Base {
  constructor () {
    super()
    var conf = new Config()
    this.adapter = new Adapter(conf.get())
  }

  createFolder (payload, cb) {
    payload['api'] = prefix
    this.adapter.post('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  getContent (payload, cb) {
    payload['api'] = prefix
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  delete (payload, cb) {
    payload['api'] = prefix
    this.adapter.delete('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200 || !resp.data) return cb(resp.message)
      this.emit('delete-gallery', payload.id)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }
}
