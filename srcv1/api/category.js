import API from './api'

export default class Category extends API {
  get (payload) {
    console.log('payload', payload)
    return super.get(super.base('/api/admin/category'), payload)
  }
}
