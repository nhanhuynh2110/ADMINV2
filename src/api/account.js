import Adapter from './adapter'
import Config from './adapter/config'

export default class Account {
  constructor () {
    var conf = new Config()
    this.adapter = new Adapter(conf)
  }

  getUserInfo (cb) {
    this.adapter.get('/api/get-current-user', {}, (error, data) => {
      if (error) return cb(error)
      if (data.status !== 200) return cb(data.message)
      return cb(null, data.data)
    })
  }
}
