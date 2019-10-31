import {Home, Category} from './index'
import STORELINK from './storeLink'
import Test from './test'

export default () => {
  return [
    {key: 'test-page', path: '/test', exact: true, component: Test},
    {key: 'home-page', path: STORELINK.HOME, exact: true, component: Home},
    {key: 'category-page', path: STORELINK.CATEGORY.grid, exact: true, component: Category}
  ]
}
