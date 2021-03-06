import LINKSTORE from '../link'
import { formatDate } from '../utility'

const LINK = LINKSTORE.PRODUCTMASTERLINK
let PAGE_HEADER = { title: 'Product', link: LINK.ADD }
let ACTIONLINK = {
  EDIT: LINK.GRID
}

let TABLEVIEW = (self) => {
  return {
    index: { text: 'STT', sorted: false, col: null, render: (row) => {} },
    code: { text: 'Code', sorted: true, col: 'code', render: (row) => row['code'] },
    title: { text: 'Title', sorted: true, col: 'title', render: (row) => row['title'] },
    isHot: { text: 'Hot', sorted: true, col: 'isHot', render: (row) => row['isHot'].toString() },
    isNewProduct: { text: 'New', sorted: true, col: 'isNewProduct', render: (row) => row['isNewProduct'].toString() },
    createDate: { text: 'Create date', sorted: true, col: 'createDate', render: (row) => { return row['createDate'] ? formatDate(row['createDate']) : '' } },
    updateDate: { text: 'Last Update Date', sorted: true, col: 'updateDate', render: (row) => row['updateDate'] ? formatDate(row['updateDate']) : '' },
    activeDate: { text: 'Last active date', sorted: true, col: 'activeDate', render: (row) => row['activeDate'] ? formatDate(row['activeDate']) : '' },
    action: { text: 'Action', sorted: false, col: null, className: 'tool-action', render: (row) => { return self.renderAction(row, '') } }
  }
}

export default {
  ACTIONLINK,
  PAGE_HEADER,
  TABLEVIEW
}
