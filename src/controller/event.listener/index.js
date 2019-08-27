import categoryListener from './category'
import categoryPOstListener from './categoryPost'
import postListener from './post'
import accountListener from './account'
export default (getCtr) => {
  return {
    setupAPIListeners: () => {
      categoryListener(getCtr)
      categoryPOstListener(getCtr)
      postListener(getCtr)
      accountListener(getCtr)
    }
  }
}
