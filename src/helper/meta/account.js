import LINKSTORE from '../link'
import { formatDate } from '../utility'

const LINK = LINKSTORE.ACCOUNTLINK
let PAGE_HEADER = { title: 'User', link: LINK.ADD }
let ACTIONLINK = {
  EDIT: LINK.GRID
}

let TABLEVIEW = (self) => {
  return {
    index: { text: 'STT', sorted: false, col: null, render: (row) => {} },
    username: { text: 'User Name', sorted: true, col: 'username', render: (row) => row['username'] },
    phone: { text: 'User Phone', sorted: true, col: 'phone', render: (row) => row['phone'] },
    createDate: { text: 'Create date', sorted: true, col: 'create_date', render: (row) => { return row['createDate'] ? formatDate(row['createDate']) : '' } },
    updateDate: { text: 'Last Update Date', sorted: true, col: 'updatedate', render: (row) => row['updateDate'] ? formatDate(row['updateDate']) : '' },
    activeDate: { text: 'Last active date', sorted: true, col: 'activeDate', render: (row) => row['activeDate'] ? formatDate(row['activeDate']) : '' },
    action: { text: 'Action', sorted: false, col: null, className: 'tool-action', render: (row) => { return self.renderAction(row, '') } }
  }
}

export default {
  ACTIONLINK,
  PAGE_HEADER,
  TABLEVIEW
}
