import roleListener from './role'
import categoryListener from './category'
import categoryPOstListener from './categoryPost'
import postListener from './post'
import accountListener from './account'
import galleryListener from './gallery'
import productListener from './product'
import advertiseListener from './advertise'
import slideListener from './slide'
import permissionListener from './permission'

export default (getCtr) => {
  return {
    setupAPIListeners: () => {
      categoryListener(getCtr)
      categoryPOstListener(getCtr)
      postListener(getCtr)
      accountListener(getCtr)
      galleryListener(getCtr)
      roleListener(getCtr)
      productListener(getCtr)
      advertiseListener(getCtr)
      slideListener(getCtr)
      permissionListener(getCtr)
    }
  }
}
