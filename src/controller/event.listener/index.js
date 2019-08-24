import categoryListener from './category'
import categoryPOstListener from './categoryPost'
import postListener from './post'
export default (getCtr) => {
  return {
    setupAPIListeners: () => {
      categoryListener(getCtr)
      categoryPOstListener(getCtr)
      postListener(getCtr)
    }
  }
}
