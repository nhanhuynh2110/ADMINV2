import categoryListener from './category'
import categoryPOstListener from './categoryPost'
export default (getCtr) => {
  return {
    setupAPIListeners: () => {
      categoryListener(getCtr)
      categoryPOstListener(getCtr)
    }
  }
}
