import UserAPI from './user'
import CategoryAPI from './category'

const APIUser = new UserAPI()
const APICategory = new CategoryAPI()

export {
  APIUser,
  APICategory
}
