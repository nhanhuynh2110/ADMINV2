import Adapter from './adapter'
import Config from './adapter/config'
import handleError from './error'
import Base from './base'

export default class ContactInfo extends Base {
  constructor () {
    super()
    var conf = new Config()
    this.adapter = new Adapter(conf.get())
  }

  get (payload, cb) {
    payload['api'] = '/api/admin/contact-info/'
    delete payload.id
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  update (payload, cb) {
    payload['api'] = '/api/admin/contact-info/'
    this.adapter.put('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }
}
