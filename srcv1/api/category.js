import API from './api'

export default class Category extends API {
  get (payload) {
    payload['api'] = '/api/admin/category'
    return super.get('/base-api', payload)
  }

  update (payload) {
    payload['api'] = '/api/admin/category/' + payload.id
    return super.put('/base-api', null, payload)
  }

  delete (payload) {
    payload['api'] = '/api/admin/category/' + payload.id
    return super.delete('/base-api', null, payload)
  }
}
