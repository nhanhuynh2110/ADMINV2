import {Home, Category} from './index'
import STORELINK from './storeLink'

export default () => {
  return [
    {key: 'home-page', path: STORELINK.HOME, exact: true, component: Home},
    {key: 'category-page', path: STORELINK.CATEGORY.grid, exact: true, component: Category}
  ]
}
