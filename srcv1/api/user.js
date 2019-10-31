import API from './api'

class User extends API {
  getAccount () {
    return this.get('/api/get-current-user')
  }
}

export default User
