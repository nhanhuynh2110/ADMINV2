import Adapter from './adapter'
import Config from './adapter/config'
import handleError from './error'
import Base from './base'

export default class FileManager extends Base {
  constructor () {
    super()
    var conf = new Config()
    this.adapter = new Adapter(conf.get())
  }

  createFolder (payload, cb) {
    payload['api'] = '/api/admin/file-manager'
    this.adapter.post('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }
}
